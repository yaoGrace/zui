import {Component, ComponentChildren, JSX, RenderableProps, h as _h, createRef} from 'preact';
import {classes, $} from '@zui/core';
import type {PickState, PickTriggerProps} from '../types';

export class PickTrigger<S extends PickState = PickState, P extends PickTriggerProps<S> = PickTriggerProps<S>, STATE = {}> extends Component<P, STATE> {
    #input = createRef<HTMLInputElement>();

    constructor(props: P) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    protected _handleClick(event: MouseEvent) {
        const {togglePop, clickType, onClick} = this.props;
        let toggle: undefined | boolean = clickType === 'open' ? true : undefined;
        const $target = $(event.target as HTMLElement);
        const clickResult = onClick?.(event);
        if (event.defaultPrevented) {
            return;
        }
        if (typeof clickResult === 'boolean') {
            toggle = clickResult;
        } else {
            if ($target.closest('[data-dismiss="pick"]').length) {
                togglePop(false);
                return;
            }
            if ($target.closest('a,input').length) {
                return;
            }
        }
        requestAnimationFrame(() => togglePop(toggle));
    }

    protected _getClass(props: RenderableProps<P>) {
        const {state, className} = props;
        const {open: opened, disabled} = state;
        return classes(
            'pick',
            className,
            opened && 'is-open focus',
            disabled && 'disabled',
        );
    }

    protected _getProps(props: RenderableProps<P>): JSX.HTMLAttributes<HTMLElement> {
        const {id, style, attrs} = props;
        return {
            id: `pick-${id}`,
            className: this._getClass(props),
            style,
            tabIndex: -1,
            onClick: this._handleClick,
            ...attrs,
        };
    }

    protected _renderTrigger(props: RenderableProps<P>): ComponentChildren {
        const {children, state} = props;
        return children ?? (state.value as string);
    }

    protected _renderValue(props: RenderableProps<P>): ComponentChildren {
        const {name, state} = props;
        if (name) {
            return <input ref={this.#input} type="hidden" className="pick-value" name={name} value={state.value} />;
        }
        return null;
    }

    componentDidUpdate(previousProps: Readonly<P>): void {
        if (previousProps.state.value !== this.props.state.value) {
            const input = this.#input.current;
            if (input) {
                $(input).trigger('change');
            }
        }
    }

    render(props: RenderableProps<P>) {
        return _h(
            props.tagName || 'div',
            this._getProps(props),
            this._renderTrigger(props),
            this._renderValue(props),
        );
    }
}
