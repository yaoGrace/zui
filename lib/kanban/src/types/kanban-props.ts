import type {CustomContentType, HElementProps, SizeSetting} from '@zui/core';
import type {DraggableOptions} from '@zui/dnd';
import type {KanbanDataSetting} from './kanban-data-setting';
import type {KanbanLaneOptions} from './kanban-lane-options';
import type {KanbanColOptions} from './kanban-col-options';
import type {KanbanItem} from './kanban-item';
import type {KanbanItemInfo} from './kanban-item-info';
import type {KanbanData} from './kanban-data';
import type {KanbanLinkOptions} from './kanban-link-options';
import type {KanbanDnDType, KanbanDragInfo, KanbanDropInfo} from './kanban-dnd-info';

export interface KanbanProps extends HElementProps {
    /* Data definition. */
    data: KanbanDataSetting;
    laneProps?: Partial<KanbanLaneOptions>;
    colProps?: Partial<KanbanColOptions>;
    itemKey?: string;
    sortLane?: boolean;
    itemProps?: Partial<KanbanItem>;
    getCol?: (col: KanbanColOptions) => KanbanColOptions | false;
    getLane?: (lane: KanbanLaneOptions) => KanbanLaneOptions | false;
    getItem?: (info: KanbanItemInfo) => KanbanItem | false;
    itemRender?: (info: KanbanItemInfo) => CustomContentType;

    /* Layout. */
    laneNameWidth?: number;
    colWidth?: number | 'auto' | ((col: KanbanColOptions) => number | 'auto');
    minColWidth?: number;
    maxColWidth?: number;
    laneHeight?: SizeSetting | ((lane: KanbanLaneOptions) => SizeSetting);
    minLaneHeight?: SizeSetting;
    maxLaneHeight?: SizeSetting;
    itemCountPerRow?: number;
    responsive?: boolean | string;
    itemGap?: SizeSetting;
    sticky?: boolean;
    lanesGap?: SizeSetting;
    colsGap?: number;

    /* Async load. */
    onLoad?: (data: KanbanData) => void | KanbanData;
    onLoadFail?: CustomContentType | ((error: Error) => CustomContentType | void);

    /* Link options.  */
    linkProps?: Partial<KanbanLinkOptions>;
    editLinks?: boolean;
    getLink?: (link: KanbanLinkOptions) => KanbanLinkOptions | false;
    onAddLink?: (newLink: KanbanLinkOptions) => void | false | Promise<void | false>;
    onDeleteLink?: (link: KanbanLinkOptions) => void | false | Promise<void | false>;

    /* Drag and drop. */
    draggable?: DraggableOptions | boolean;
    dragTypes?: KanbanDnDType | KanbanDnDType[];
    onDragStart?: (info: KanbanDragInfo) => void | boolean;
    onDrop?: (changes: Partial<KanbanData>, info: KanbanDropInfo, restore: () => void) => void | false;

    /* Component lifecycle. */
    beforeRender?: (options: KanbanProps) => void;
    afterRender?: (firstRender: boolean) => void;
    beforeDestroy?: () => void;
}
