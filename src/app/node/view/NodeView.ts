/// <reference path="../../../../def/require.d.ts" />
/// <amd-dependency path="text!./NodeView.html" />
/// <amd-dependency path="text!./NodeList.html" />
/// <amd-dependency path="text!./NodeView.css" />
/// <amd-dependency path="text!./NodeList.css" />

var templateItem = require('text!./NodeView.html');
var templateList = require('text!./NodeList.html');
var styleItem = require('text!./NodeView.css');
var styleList = require('text!./NodeList.css');

import View = require('core/View');
import Binder = require('core/Binder');
import CollectionBinder = require('core/CollectionBinder');
import IBindableListView = require('core/IBindableListView');
import NodeModule = require('../NodeModule');

export class Item extends View<NodeModule.NodeModel> {
    private elName = this.$('.NodeView-name')[0];

    private binder:Binder;
    private collectionBinder:CollectionBinder<Item, NodeModule.NodeModel>;
    private open = false;

    constructor(options?:any) {
        super(options);

        this.binder = new Binder({
            'name': this.elName
        }, this.model);

        var list = new List();
        list.attachTo(this.$('.NodeView-children')[0]);

        this.listenTo(this.model.getChildren(), 'add', this.toggleOpen.bind(this, true));

        this.collectionBinder = new CollectionBinder(list, this.model.getChildren());
    }

    private toggleOpen(toggle:boolean) {
        this.open = toggle;
        this.toggleModifier('open', this.open);
    }

    private onToggleClick() {
        this.toggleOpen(!this.open);
    }

    private onPlusClick(e:JQueryEventObject) {
        this.model.addChild();
    }

    private onMinusClick() {
        this.model.destroy();
    }

    private onNameBlur() {
        this.binder.syncToModel();
    }

    disableEdit() {
        this.elName.contentEditable = 'false';
        this.$('.NodeView-controls-minus:first').remove();
    }

    events() {
        return {
            'click .NodeView-controls-toggle:first': 'onToggleClick',
            'click .NodeView-controls-plus:first': 'onPlusClick',
            'click .NodeView-controls-minus:first': 'onMinusClick',
            'blur .NodeView-name:first': 'onNameBlur'
        };
    }

    html() {
        return templateItem;
    }

    css() {
        return styleItem;
    }
}

export class List extends View<any> implements IBindableListView<Item, NodeModule.NodeModel> {
    addItem(model:NodeModule.NodeModel):Item {
        var item = new Item({model: model});
        item.attachTo(this.el);
        return item;
    }

    removeItem(item:Item) {
        item.remove();
    }

    html() {
        return templateList;
    }

    css() {
        return styleList;
    }
}