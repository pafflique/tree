/// <reference path="../../def/backbone.d.ts" />
/// <reference path="../../def/jquery.d.ts" />

import Backbone = require('backbone');
import Model = require('core/Model');

class Collection<T extends Model> extends Backbone.Collection<T> {

}

export = Collection;