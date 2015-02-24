import View = require('core/View');
import Model = require('core/Model');

interface IBindableListView<T extends View<any>, M extends Model> {
    addItem(model:M):T;
    removeItem(item:T);
}

export = IBindableListView;