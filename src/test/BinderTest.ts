/// <reference path="../../def/mocha.d.ts" />
/// <reference path="../../def/chai.d.ts" />

import Binder = require('core/Binder');
import NodeModule = require('app/node/NodeModule');

describe('Binder', () => {
    var el = document.createElement('div');
    var model = new NodeModule.NodeModel({
        name: 'Test Node',
        children: []
    });
    var binder = new Binder({
        name: el
    }, model);

    it('should update view on model change', () => {
        var expected = 'Model Changed';

        model.set('name', expected);

        expect(el.textContent).to.equal(expected);
    });

    it('should sync data from view and set to model', () => {
        var expected = 'View Changed';

        el.textContent = expected;
        binder.syncToModel();
        expect(model.get('name')).to.equal(expected);
    });
});
