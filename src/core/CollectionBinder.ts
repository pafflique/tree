import View = require('core/View');
import Model = require('core/Model');
import Collection = require('core/Collection');
import IBindableListView = require('core/IBindableListView');

class CollectionBinder<T extends View<any>, M extends Model> {
    private itemMap:{[id: string]: T} = {};

    constructor(private view:IBindableListView<T, M>, private collection:Collection<M>) {
        collection.on('add', this.onAdd.bind(this));
        collection.on('remove', this.onRemove.bind(this));
    }

    private onAdd(model:M) {
        var item = this.view.addItem(model);
        this.itemMap[model.cid] = item;
    }

    private onRemove(model:M) {
        var item = this.itemMap[model.cid];
        this.view.removeItem(item);
    }
}

export = CollectionBinder;