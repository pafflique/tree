import NodeView = require('app/node/view/NodeView');
import NodeModule = require('app/node/NodeModule');

class Application {
    private saveTimeout:number;

    public start(el:HTMLElement) {
        var root = new NodeModule.NodeModel();
        var view = new NodeView.Item({model: root});

        root.fetch();
        root.on('change', () => {
            clearTimeout(this.saveTimeout);
            this.saveTimeout = setTimeout(root.sync.bind(root), 100);
        });

        view.disableEdit();
        view.attachTo(el);
    }
}

export = Application;