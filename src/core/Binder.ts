import Model = require('core/Model');

interface IBindings {
    [attribute: string]: HTMLElement
}

class Binder {
    constructor(private bindings:IBindings, private model:Model) {
        for (var attr in bindings) {
            var el = bindings[attr];

            model.on('change:' + attr, () => {
                this.applyChange(el, attr);
            });

            this.applyChange(el, attr);
        }
    }

    syncToModel() {
        for (var attr in this.bindings) {
            var el = this.bindings[attr];

            this.model.set(attr, this.getValue(el));
        }
    }

    private applyChange(el:HTMLElement, attr:string) {
        var value = this.model.get(attr);

        if (this.isInput(el)) {
            (<HTMLInputElement>el).value = value;
        } else {
            el.textContent = value;
        }
    }

    private getValue(el:HTMLElement) {
        if (this.isInput(el)) {
            return (<HTMLInputElement>el).value;
        } else {
            return el.textContent;
        }
    }

    private isInput(el:HTMLElement) {
        return ['INPUT', 'TEXTAREA'].indexOf(el.tagName) > -1;
    }
}

export = Binder;