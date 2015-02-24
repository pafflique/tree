import Model = require('core/Model');
import Collection = require('core/Collection');

export class NodeModel extends Model {
    private children:NodeCollection;

    constructor(attributes?:any, options?:any) {
        super(attributes, options);

        this.children = new NodeCollection();

        this.listenTo(this.children, 'add remove reset change', this.trigger.bind(this, 'change'));
    }

    addChild() {
        this.children.add(new NodeModel());
    }

    getChildren() {
        return this.children;
    }

    defaults() {
        return {
            name: 'New Node',
            children: []
        };
    }

    sync(method:string, model:any, options:any) {
        if (method == 'read') {
            var tree = localStorage.getItem('NodeTree');
            var data:any;

            if (tree) {
                data = JSON.parse(tree);
            } else {
                data = this.defaults();
                data.name = 'Root';
            }

            options.success(data);
        } else {
            localStorage.setItem('NodeTree', JSON.stringify(this.toJSON()));
        }

        return null;
    }

    parse(response:any, options?:any) {
        response.children.forEach((child) => {
            var node = new NodeModel(child);
            this.children.add(node);
            node.parse(child);
        });

        return {name: response.name};
    }

    toJSON(options?:any) {
        var json = super.toJSON(options);

        json.children = this.children.toJSON(options);

        return json;
    }
}

export class NodeCollection extends Collection<NodeModel> {

}

NodeCollection.prototype.model = NodeModel;
