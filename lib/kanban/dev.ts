import 'preact/debug';
import 'zui-dev';
import {$} from '@zui/core';
import '@zui/icons';
import '@zui/button';
import '@zui/list/src/style';
import '@zui/dropdown';
import '@zui/toolbar';
import '@zui/checkbox';
import '@zui/cards';
import '@zui/menu/src/style';
import {KanbanList} from './src/main';
import {createKanbanData} from './dev/create-kanban-data';

onPageLoad(() => {
    const kanbanOptions = {
        heading: {
            title: 'Kanban',
            actions: [
                {icon: 'cog text-gray', title: '设置'},
                {
                    type: 'dropdown',
                    icon: 'ellipsis-v text-gray',
                    caret: false,
                    placement: 'bottom-end',
                    items: [ // 下拉菜单内容
                        {text: '编辑', icon: 'edit'},
                    ],
                },
            ],
        },
        data: {
            ...createKanbanData(),
            links: [
                {from: '5', to: '12'},
                {from: '16', to: '20'},
                {from: '16', to: '23'},
                {from: '24', to: '56'},
                {from: '6', to: '56'},
            ],
        },
        editLinks: true,
        colProps: {
            /* 通过 actions 自定义列操作按钮（actions 还可以为一个回调函数动态返回操作按钮设置）。 */
            actions: () => {
                return [{
                    icon: 'check-plus text-primary',
                    onClick: () => console.log('Click add'),
                }, {
                    type: 'dropdown',
                    icon: 'ellipsis-v text-primary',
                    caret: false,
                    items: [ // 下拉菜单内容
                        {text: '编辑', icon: 'edit'},
                    ],
                }];
            },
        },
        itemRender: (info) => {
            /* 自定义渲染卡片，通过 {html: ...} 返回卡片 HTML内容。 */
            return {className: 'card kanban-item card-list-item item', html: `<div class="card-heading"><span class="card-title">${info.item.title}</span></div>`};
        },
        getCol(col) {
            /* 通过 content 属性自定义列额外内容。 */
            return $.extend({
                contentClass: 'bg-surface shadow-sm',
                content: function (info) {
                    const id = `content-${info.lane}-${info.name}`;
                    const toggleID = `toggle-${info.lane}-${info.name}`;
                    return {attrs: {id: id, className: 'relative p-2'}, html: [
                        '<div class="row border mb-2">',
                        '   <div class="cell w-1/3 col items-center justify-center">',
                        '       <div>120 <span class="text-sm text-gray">sp</span></div>',
                        '       <div>工作量</div>',
                        '   </div>',
                        '   <div class="cell w-1/3 border-l col items-center justify-center">',
                        '       <div>120 <span class="text-sm text-gray">sp</span></div>',
                        '       <div>工作量</div>',
                        '   </div>',
                        '   <div class="cell w-1/3 border-l col items-center justify-center">',
                        '       <div>120 <span class="text-sm text-gray">sp</span></div>',
                        '       <div>工作量</div>',
                        '   </div>',
                        '</div>',
                        `<style>#${id} .as-expand-content {display: none}#${toggleID}:checked + .as-expand-content {display: block}#${toggleID}:checked + .as-expand-content + .as-collapse-content {visibility: hidden}#${id} .as-expand-content::before {content:' ';display:block;position:absolute;left:0;right:0;bottom:-10px;height:10px;background-image:linear-gradient(180deg,rgba(0,0,0,.05),transparent),linear-gradient(180deg,rgba(0,0,0,.05),transparent 50%)}</style>`,
                        `<input type="checkbox" class="hidden" id="${toggleID}" />`,
                        '<div class="as-expand-content bg-surface px-3 py-1 absolute left-0 right-0 top-10">',
                        '   <div>用户需求</div>',
                        '   <div>描述文本描述文本描述文本描述文本描述文本描述文本</div>',
                        '   <hr class="my-2">',
                        '   <div>用户需求</div>',
                        '   <div>描述文本描述文本描述文本描述文本描述文本描述文本</div>',
                        `   <div class="center"><label for="${toggleID}" class="btn light bg-opacity-50 ring-0 size-xs w-7 text-gray rounded"><i class="icon icon-chevron-up scale-75"></i></label></div>`,
                        '</div>',
                        `<div class="as-collapse-content center"><label for="${toggleID}" class="btn light bg-opacity-50 ring-0 size-xs w-7 text-gray rounded"><i class="icon icon-chevron-down scale-75"></i></label></div>`,
                    ].join('')};
                },
            }, col);
        },
    };
    const kanban2Options = {
        heading: {
            title: {html: '<span>设置区域</span> <i class="icon icon-chevron-up"></i>'},
        },
        data: createKanbanData(),
    };
    const kanban3Options = {
        heading: {
            title: '父子列',
        },
        data: {
            cols: [
                {title: '未完成', name: 'todo'},
                {title: '进行中', name: 'doing'},
                {title: '已指派', name: 'assigned', parentName: 'doing'},
                {title: '实现中', name: 'wip', parentName: 'doing'},
                {title: '已完成', name: 'done'},
                {title: '其他', name: 'other', asParent: true},
            ],
            lanes: [
                {title: '需求', name: 'story'},
                {title: '任务', name: 'task'},
            ],
            items: {
                story: {
                    todo: [
                        {id: '1', title: '用户需求1'},
                        {id: '2', title: '用户需求2'},
                        {id: '3', title: '用户需求3'},
                    ],
                    assigned: [
                        {id: '4', title: '用户需求4'},
                        {id: '5', title: '用户需求5'},
                        {id: '6', title: '用户需求6'},
                    ],
                },
                task: {
                    assigned: [
                        {id: '12', title: '任务1'},
                    ],
                    wip: [
                        {id: '7', title: '任务1'},
                        {id: '8', title: '任务2'},
                    ],
                    done: [
                        {id: '9', title: '任务3'},
                        {id: '10', title: '任务4'},
                        {id: '11', title: '任务5'},
                    ],
                },
            },
        },
        itemProps: {
            actions: () => {
                return [{
                    icon: 'check-plus text-primary',
                    onClick: () => console.log('Click add'),
                }, {
                    type: 'dropdown',
                    icon: 'ellipsis-v text-primary',
                    caret: false,
                    items: [ // 下拉菜单内容
                        {text: '编辑', icon: 'edit'},
                    ],
                }];
            },
        },
    };
    const kanbanList = new KanbanList('#kanbanList', {
        items: [kanbanOptions, kanban2Options, kanban3Options],
        height: 'calc(100vh - 160px)',
    });
    console.log('> kanbanList', kanbanList);
});
