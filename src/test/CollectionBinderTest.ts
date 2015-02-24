/// <reference path="../../def/mocha.d.ts" />
/// <reference path="../../def/chai.d.ts" />

import CollectionBinder = require('core/CollectionBinder');
import NodeModule = require('app/node/NodeModule');
import NodeView = require('app/node/view/NodeView');

describe('CollectionBinder', () => {
    var list = new NodeView.List();
    var collection = new NodeModule.NodeCollection();
    var collectionBinder = new CollectionBinder(list, collection);

    beforeEach(() => {
        list.el.innerHTML = '';
        collection.reset();
    });

    it('should add items to view on add to collection', () => {
        var models = [new NodeModule.NodeModel(), new NodeModule.NodeModel(), new NodeModule.NodeModel()];
        expect(list.el.childElementCount).to.equal(0);
        collection.add(models);
        expect(list.el.childElementCount).to.equal(models.length);
    });

    it('should remove item to view on remove from collection', () => {
        var n1 = new NodeModule.NodeModel();
        var n2 = new NodeModule.NodeModel();
        var n3 = new NodeModule.NodeModel();
        var models = [n1, n2, n3];

        collection.add(models);
        expect(list.el.childElementCount).to.equal(3);
        collection.remove(n1);
        expect(list.el.childElementCount).to.equal(2);
        n2.destroy();
        expect(list.el.childElementCount).to.equal(1);
    });
});
