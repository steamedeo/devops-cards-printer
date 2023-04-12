define(["TFS/WorkItemTracking/RestClient","TFS/WorkItemTracking/Contracts","q"],function(e,t,r){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){"use strict";t.__esModule=!0,t.extend=s,t.indexOf=function(e,t){for(var r=0,n=e.length;r<n;r++)if(e[r]===t)return r;return-1},t.escapeExpression=function(e){if("string"!=typeof e){if(e&&e.toHTML)return e.toHTML();if(null==e)return"";if(!e)return e+"";e=""+e}if(!i.test(e))return e;return e.replace(a,o)},t.isEmpty=function(e){return!e&&0!==e||!(!d(e)||0!==e.length)},t.createFrame=function(e){var t=s({},e);return t._parent=e,t},t.blockParams=function(e,t){return e.path=t,e},t.appendContextPath=function(e,t){return(e?e+".":"")+t};var n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},a=/[&<>"'`=]/g,i=/[&<>"'`=]/;function o(e){return n[e]}function s(e){for(var t=1;t<arguments.length;t++)for(var r in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],r)&&(e[r]=arguments[t][r]);return e}var l=Object.prototype.toString;t.toString=l;var u=function(e){return"function"==typeof e};u(/x/)&&(t.isFunction=u=function(e){return"function"==typeof e&&"[object Function]"===l.call(e)}),t.isFunction=u;var d=Array.isArray||function(e){return!(!e||"object"!=typeof e)&&"[object Array]"===l.call(e)};t.isArray=d},function(e,t,r){"use strict";t.__esModule=!0;var n=["description","fileName","lineNumber","message","name","number","stack"];function a(e,t){var r=t&&t.loc,i=void 0,o=void 0;r&&(e+=" - "+(i=r.start.line)+":"+(o=r.start.column));for(var s=Error.prototype.constructor.call(this,e),l=0;l<n.length;l++)this[n[l]]=s[n[l]];Error.captureStackTrace&&Error.captureStackTrace(this,a);try{r&&(this.lineNumber=i,Object.defineProperty?Object.defineProperty(this,"column",{value:o,enumerable:!0}):this.column=o)}catch(e){}}a.prototype=new Error,t.default=a,e.exports=t.default},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.HandlebarsEnvironment=u;var a=r(0),i=n(r(1)),o=r(10),s=r(18),l=n(r(20));t.VERSION="4.2.0";t.COMPILER_REVISION=7;t.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};function u(e,t,r){this.helpers=e||{},this.partials=t||{},this.decorators=r||{},o.registerDefaultHelpers(this),s.registerDefaultDecorators(this)}u.prototype={constructor:u,logger:l.default,log:l.default.log,registerHelper:function(e,t){if("[object Object]"===a.toString.call(e)){if(t)throw new i.default("Arg not supported with multiple helpers");a.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if("[object Object]"===a.toString.call(e))a.extend(this.partials,e);else{if(void 0===t)throw new i.default('Attempting to register a partial called "'+e+'" as undefined');this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]},registerDecorator:function(e,t){if("[object Object]"===a.toString.call(e)){if(t)throw new i.default("Arg not supported with multiple decorators");a.extend(this.decorators,e)}else this.decorators[e]=t},unregisterDecorator:function(e){delete this.decorators[e]}};var d=l.default.log;t.log=d,t.createFrame=a.createFrame,t.logger=l.default},function(e,t,r){var n,a;n=[r,t,r(4),r(5),r(6)],void 0===(a=function(e,t,n,a,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(7),s=VSS.getExtensionContext(),l=n.getClient(),u={New:"B2B2B2","Ready for Analysis":"009CCC","Under Analysis":"FBE74B","Ready for Development":"AE88B9","Ready for SOW":"5688E0","Under Development":"5688E0","Ready for Test":"5688E0","Under Test":"5688E0",Blocked:"E87025","Ready for Approval":"5688E0",Done:"339933",Removed:"1D2125"},d={getMenuItems:function(e){var t="Print Physical Card";return e.workItemIds&&e.workItemIds.length>1&&(t="Print Physical Card"),[{action:function(e){return c(e.workItemIds||e.ids||[e.workItemId||e.id]).then(function(e){return function(e){return e.map(function(e){var t={},r=u[e.fields["System.State"]];return console.log(r),function(e){return l.getWorkItemType(e.fields["System.TeamProject"],e.fields["System.WorkItemType"])}(e).then(function(n){var a;try{var i=!1,o=n.color;console.log(o);var s=n.icon.url,l=e.fields["System.Tags"],u=f(e.fields["System.AreaPath"]),d=f(e.fields["System.IterationPath"]);"User Story"===e.fields["System.WorkItemType"]&&(t={type:e.fields["System.WorkItemType"],title:e.fields["System.Title"],id:e.fields["System.Id"],estimate:e.fields["Microsoft.VSTS.Scheduling.StoryPoints"],assigned_to:e.fields["System.AssignedTo"],area_path:u,iteration_path:d,tags:l,border_color:o,icon:s},i=!0),"Product Backlog Item"===e.fields["System.WorkItemType"]&&(t={type:e.fields["System.WorkItemType"],title:e.fields["System.Title"],id:e.fields["System.Id"],estimate:e.fields["Microsoft.VSTS.Common.BusinessValue"],assigned_to:e.fields["System.AssignedTo"],area_path:u,iteration_path:d,tags:l,border_color:o,icon:s},i=!0),"Requirement"===e.fields["System.WorkItemType"]&&(t={type:e.fields["System.WorkItemType"],title:e.fields["System.Title"],id:e.fields["System.Id"],estimate:e.fields["Microsoft.VSTS.Scheduling.OriginalEstimate"],assigned_to:e.fields["System.AssignedTo"],area_path:u,iteration_path:d,tags:l,border_color:o,icon:s},i=!0),"Bug"===e.fields["System.WorkItemType"]&&(t={type:e.fields["System.WorkItemType"],title:e.fields["System.Title"],id:e.fields["System.Id"],estimate:e.fields["Microsoft.VSTS.Scheduling.OriginalEstimate"],assigned_to:e.fields["System.AssignedTo"],area_path:u,iteration_path:d,tags:l,border_color:o,icon:s},i=!0),"Task"===e.fields["System.WorkItemType"]&&(t={type:e.fields["System.WorkItemType"],title:e.fields["System.Title"],description:e.fields["System.Description"],id:e.fields["System.Id"],estimate:e.fields["Microsoft.VSTS.Scheduling.OriginalEstimate"],assigned_to:e.fields["System.AssignedTo"],area_path:u,iteration_path:d,tags:l,border_color:o,icon:s},i=!0),"Epic"!==e.fields["System.WorkItemType"]&&"Feature"!==e.fields["System.WorkItemType"]||(t={type:e.fields["System.WorkItemType"],title:e.fields["System.Title"],description:e.fields["System.Description"],id:e.fields["System.Id"],estimate:e.fields["Microsoft.VSTS.Scheduling.Effort"],assigned_to:e.fields["System.AssignedTo"],product_owner:e.fields["Custom.ProductOwnerIVECO"],wave_quarter:e.fields["Custom.WAVEQUARTER"],area_path:u,state:e.fields["System.State"],priority:e.fields["Microsoft.VSTS.Common.Priority"],state_color:r,iteration_path:d,tags:l,border_color:o,icon:s},i=!0),i||(t={type:e.fields["System.WorkItemType"],title:e.fields["System.Title"],description:e.fields["System.Description"],id:e.fields["System.Id"],estimate:e.fields["Microsoft.VSTS.Scheduling.OriginalEstimate"],assigned_to:e.fields["System.AssignedTo"],area_path:u,iteration_path:d,tags:l,border_color:o,icon:s});for(var p=void 0,m=0,h=e.relations;m<h.length;m++){var v=h[m];if("Parent"===(null===(a=v.attributes)||void 0===a?void 0:a.name)){p=parseInt(v.url.split("/").slice(-1)[0]);break}}return p?c([p]):null}catch(e){return t={type:"processerror",message:e},console.log(t),null}}).then(function(e){var r,n=e[0];if(n){for(var a=void 0,i=0,o=n.relations;i<o.length;i++){var s=o[i];if("Parent"===(null===(r=s.attributes)||void 0===r?void 0:r.name)){a=parseInt(s.url.split("/").slice(-1)[0]);break}}return t.parent_name="".concat(n.id," ").concat(n.fields["System.Title"]),a?c([a]):null}}).then(function(e){var r=e[0];return t.grandparent_name="".concat(r.id," ").concat(r.fields["System.Title"]),t})})}(e)}).then(function(e){return i.all(e)}).then(function(e){var t=document.createElement("div");t.setAttribute("class","container border");var r=0;e.forEach(function(n){var a;r++,"processerror"!==n.type?(a=o({number:n.id,style_wiNumber:n.id,work_item_type:n.type,title:n.title,estimate:n.estimate,assigned_to:n.assigned_to,area_path:n.area_path,wave_quarter:n.wave_quarter,product_owner:n.product_owner,iteration_path:n.iteration_path,tags:n.tags,state:n.state,state_color:n.state_color,priority:n.priority,parent_name:n.parent_name,grandparent_name:n.grandparent_name,border_color:n.border_color,icon:n.icon}),t.innerHTML+=a):t.innerHTML+="<div> ERROR <br>"+n.message+"</div>",r%3==0&&e.length>r&&(t.innerHTML+="<p style='page-break-before: always'><br/>&nbsp;<br/>")}),document.body.appendChild(t),setTimeout(function(){window.focus(),document.execCommand("print",!1,null)||window.print(),t.parentElement.removeChild(t)},1e3)})},icon:"static/img/print14.png",text:t,title:t}]}};function c(e){return l.getWorkItems(e,void 0,void 0,a.WorkItemExpand.All)}function f(e){if(e.length>0){var t=e.split("\\");return t[t.length-1]}return e}VSS.register("".concat(s.publisherId,".").concat(s.extensionId,".print-work-item"),d)}.apply(t,n))||(e.exports=a)},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t){e.exports=r},function(e,t,r){var n=r(8);e.exports=(n.default||n).template({compiler:[7,">= 4.0.0"],main:function(e,t,r,n,a){var i,o=null!=t?t:e.nullContext||{},s=r.helperMissing,l="function",u=e.escapeExpression;return' <style type="text/css">\n        .border-story-'+u(typeof(i=null!=(i=r.style_wiNumber||(null!=t?t.style_wiNumber:t))?i:s)===l?i.call(o,{name:"style_wiNumber",hash:{},data:a}):i)+" {\n          border: 4px solid #"+u(typeof(i=null!=(i=r.border_color||(null!=t?t.border_color:t))?i:s)===l?i.call(o,{name:"border_color",hash:{},data:a}):i)+";\n        }\n        .fill-estimate-"+u(typeof(i=null!=(i=r.style_wiNumber||(null!=t?t.style_wiNumber:t))?i:s)===l?i.call(o,{name:"style_wiNumber",hash:{},data:a}):i)+" {\n          border: 4px solid #"+u(typeof(i=null!=(i=r.state_color||(null!=t?t.state_color:t))?i:s)===l?i.call(o,{name:"state_color",hash:{},data:a}):i)+';\n        }\n</style>\n<div class="container border-story-'+u(typeof(i=null!=(i=r.style_wiNumber||(null!=t?t.style_wiNumber:t))?i:s)===l?i.call(o,{name:"style_wiNumber",hash:{},data:a}):i)+'">\n  <div class="title-and-estimate-container">\n    <div class="title-container">\n        <div class="vsts-number">\n          <img src="'+u(typeof(i=null!=(i=r.icon||(null!=t?t.icon:t))?i:s)===l?i.call(o,{name:"icon",hash:{},data:a}):i)+'" class="icon-image"/>\n          <div class="work-item-text">'+u(typeof(i=null!=(i=r.work_item_type||(null!=t?t.work_item_type:t))?i:s)===l?i.call(o,{name:"work_item_type",hash:{},data:a}):i)+" - "+u(typeof(i=null!=(i=r.number||(null!=t?t.number:t))?i:s)===l?i.call(o,{name:"number",hash:{},data:a}):i)+'</div>\n          <div class="col-space">&nbsp;</div>\n          <div class="work-item-text">Priority: '+u(typeof(i=null!=(i=r.priority||(null!=t?t.priority:t))?i:s)===l?i.call(o,{name:"priority",hash:{},data:a}):i)+'</div>\n          <div class="col-space">&nbsp;</div>\n          <div class="work-item-text">State: '+u(typeof(i=null!=(i=r.state||(null!=t?t.state:t))?i:s)===l?i.call(o,{name:"state",hash:{},data:a}):i)+'</div>\n          <div class="col-space">&nbsp;</div>\n        </div>\n        <hr>\n      <div class="title-text">\n        '+u(typeof(i=null!=(i=r.title||(null!=t?t.title:t))?i:s)===l?i.call(o,{name:"title",hash:{},data:a}):i)+'\n      </div>\n    </div>\n    <div class="estimate-container fill-estimate-'+u(typeof(i=null!=(i=r.style_wiNumber||(null!=t?t.style_wiNumber:t))?i:s)===l?i.call(o,{name:"style_wiNumber",hash:{},data:a}):i)+'">\n        <div class="estimate-number">\n          <div>'+u(typeof(i=null!=(i=r.estimate||(null!=t?t.estimate:t))?i:s)===l?i.call(o,{name:"estimate",hash:{},data:a}):i)+'</div>\n      </div>\n\n    </div>\n  </div>\n  <div class="po-vsts-container">\n    <div class="po">\n      <strong>Assigned To:</strong>\n      '+u(typeof(i=null!=(i=r.assigned_to||(null!=t?t.assigned_to:t))?i:s)===l?i.call(o,{name:"assigned_to",hash:{},data:a}):i)+'\n    </div>\n  </div>\n  <div class="space-block"> <hr></div>\n  <div class="po-path-container">\n    <hr>\n    <div class="vsts-area">\n        <strong>Epic:</strong> '+u(typeof(i=null!=(i=r.parent_name||(null!=t?t.parent_name:t))?i:s)===l?i.call(o,{name:"parent_name",hash:{},data:a}):i)+'\n    </div>\n        <div class="col-space">&nbsp;</div>\n    <div class="vsts-iteration">\n        <strong>PO:</strong> '+u(typeof(i=null!=(i=r.product_owner||(null!=t?t.product_owner:t))?i:s)===l?i.call(o,{name:"product_owner",hash:{},data:a}):i)+'\n    </div>\n    <div class="col-space">&nbsp;</div>\n        <div class="vsts-iteration">\n        <strong>Wave Quarter:</strong> '+u(typeof(i=null!=(i=r.wave_quarter||(null!=t?t.wave_quarter:t))?i:s)===l?i.call(o,{name:"wave_quarter",hash:{},data:a}):i)+'\n    </div>\n  </div>\n  <div class="po-path-container">\n    <hr>\n    <div class="vsts-area">\n        <strong>Initiative:</strong> '+u(typeof(i=null!=(i=r.grandparent_name||(null!=t?t.grandparent_name:t))?i:s)===l?i.call(o,{name:"grandparent_name",hash:{},data:a}):i)+"\n    </div>\n  </div>\n</div>"},useData:!0})},function(e,t,r){e.exports=r(9).default},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}t.__esModule=!0;var i=a(r(2)),o=n(r(21)),s=n(r(1)),l=a(r(0)),u=a(r(22)),d=n(r(23));function c(){var e=new i.HandlebarsEnvironment;return l.extend(e,i),e.SafeString=o.default,e.Exception=s.default,e.Utils=l,e.escapeExpression=l.escapeExpression,e.VM=u,e.template=function(t){return u.template(t,e)},e}var f=c();f.create=c,d.default(f),f.default=f,t.default=f,e.exports=t.default},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.registerDefaultHelpers=function(e){a.default(e),i.default(e),o.default(e),s.default(e),l.default(e),u.default(e),d.default(e)};var a=n(r(11)),i=n(r(12)),o=n(r(13)),s=n(r(14)),l=n(r(15)),u=n(r(16)),d=n(r(17))},function(e,t,r){"use strict";t.__esModule=!0;var n=r(0);t.default=function(e){e.registerHelper("blockHelperMissing",function(t,r){var a=r.inverse,i=r.fn;if(!0===t)return i(this);if(!1===t||null==t)return a(this);if(n.isArray(t))return t.length>0?(r.ids&&(r.ids=[r.name]),e.helpers.each(t,r)):a(this);if(r.data&&r.ids){var o=n.createFrame(r.data);o.contextPath=n.appendContextPath(r.data.contextPath,r.name),r={data:o}}return i(t,r)})},e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0;var n=r(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r(1));t.default=function(e){e.registerHelper("each",function(e,t){if(!t)throw new a.default("Must pass iterator to #each");var r=t.fn,i=t.inverse,o=0,s="",l=void 0,u=void 0;function d(t,a,i){l&&(l.key=t,l.index=a,l.first=0===a,l.last=!!i,u&&(l.contextPath=u+t)),s+=r(e[t],{data:l,blockParams:n.blockParams([e[t],t],[u+t,null])})}if(t.data&&t.ids&&(u=n.appendContextPath(t.data.contextPath,t.ids[0])+"."),n.isFunction(e)&&(e=e.call(this)),t.data&&(l=n.createFrame(t.data)),e&&"object"==typeof e)if(n.isArray(e))for(var c=e.length;o<c;o++)o in e&&d(o,o,o===e.length-1);else{var f=void 0;for(var p in e)e.hasOwnProperty(p)&&(void 0!==f&&d(f,o-1),f=p,o++);void 0!==f&&d(f,o-1,!0)}return 0===o&&(s=i(this)),s})},e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0;var n=function(e){return e&&e.__esModule?e:{default:e}}(r(1));t.default=function(e){e.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new n.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})},e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0;var n=r(0);t.default=function(e){e.registerHelper("if",function(e,t){return n.isFunction(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||n.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,r){return e.helpers.if.call(this,t,{fn:r.inverse,inverse:r.fn,hash:r.hash})})},e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0,t.default=function(e){e.registerHelper("log",function(){for(var t=[void 0],r=arguments[arguments.length-1],n=0;n<arguments.length-1;n++)t.push(arguments[n]);var a=1;null!=r.hash.level?a=r.hash.level:r.data&&null!=r.data.level&&(a=r.data.level),t[0]=a,e.log.apply(e,t)})},e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0,t.default=function(e){e.registerHelper("lookup",function(e,t){return e?"constructor"!==t||e.propertyIsEnumerable(t)?e[t]:void 0:e})},e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0;var n=r(0);t.default=function(e){e.registerHelper("with",function(e,t){n.isFunction(e)&&(e=e.call(this));var r=t.fn;if(n.isEmpty(e))return t.inverse(this);var a=t.data;return t.data&&t.ids&&((a=n.createFrame(t.data)).contextPath=n.appendContextPath(t.data.contextPath,t.ids[0])),r(e,{data:a,blockParams:n.blockParams([e],[a&&a.contextPath])})})},e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0,t.registerDefaultDecorators=function(e){n.default(e)};var n=function(e){return e&&e.__esModule?e:{default:e}}(r(19))},function(e,t,r){"use strict";t.__esModule=!0;var n=r(0);t.default=function(e){e.registerDecorator("inline",function(e,t,r,a){var i=e;return t.partials||(t.partials={},i=function(a,i){var o=r.partials;r.partials=n.extend({},o,t.partials);var s=e(a,i);return r.partials=o,s}),t.partials[a.args[0]]=a.fn,i})},e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0;var n=r(0),a={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(e){if("string"==typeof e){var t=n.indexOf(a.methodMap,e.toLowerCase());e=t>=0?t:parseInt(e,10)}return e},log:function(e){if(e=a.lookupLevel(e),"undefined"!=typeof console&&a.lookupLevel(a.level)<=e){var t=a.methodMap[e];console[t]||(t="log");for(var r=arguments.length,n=Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];console[t].apply(console,n)}}};t.default=a,e.exports=t.default},function(e,t,r){"use strict";function n(e){this.string=e}t.__esModule=!0,n.prototype.toString=n.prototype.toHTML=function(){return""+this.string},t.default=n,e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0,t.checkRevision=function(e){var t=e&&e[0]||1,r=i.COMPILER_REVISION;if(t!==r){if(t<r){var n=i.REVISION_CHANGES[r],o=i.REVISION_CHANGES[t];throw new a.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+n+") or downgrade your runtime to an older version ("+o+").")}throw new a.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}},t.template=function(e,t){if(!t)throw new a.default("No environment passed to template");if(!e||!e.main)throw new a.default("Unknown template object: "+typeof e);e.main.decorator=e.main_d,t.VM.checkRevision(e.compiler);var r={strict:function(e,t){if(!(t in e))throw new a.default('"'+t+'" not defined in '+e);return e[t]},lookup:function(e,t){for(var r=e.length,n=0;n<r;n++)if(e[n]&&null!=e[n][t])return e[n][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:n.escapeExpression,invokePartial:function(r,i,o){o.hash&&(i=n.extend({},i,o.hash),o.ids&&(o.ids[0]=!0));r=t.VM.resolvePartial.call(this,r,i,o);var s=t.VM.invokePartial.call(this,r,i,o);null==s&&t.compile&&(o.partials[o.name]=t.compile(r,e.compilerOptions,t),s=o.partials[o.name](i,o));if(null!=s){if(o.indent){for(var l=s.split("\n"),u=0,d=l.length;u<d&&(l[u]||u+1!==d);u++)l[u]=o.indent+l[u];s=l.join("\n")}return s}throw new a.default("The partial "+o.name+" could not be compiled when running in runtime-only mode")},fn:function(t){var r=e[t];return r.decorator=e[t+"_d"],r},programs:[],program:function(e,t,r,n,a){var i=this.programs[e],s=this.fn(e);return t||a||n||r?i=o(this,e,s,t,r,n,a):i||(i=this.programs[e]=o(this,e,s)),i},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var r=e||t;return e&&t&&e!==t&&(r=n.extend({},t,e)),r},nullContext:Object.seal({}),noop:t.VM.noop,compilerInfo:e.compiler};function s(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],a=n.data;s._setup(n),!n.partial&&e.useData&&(a=function(e,t){t&&"root"in t||((t=t?i.createFrame(t):{}).root=e);return t}(t,a));var o=void 0,u=e.useBlockParams?[]:void 0;function d(t){return""+e.main(r,t,r.helpers,r.partials,a,u,o)}return e.useDepths&&(o=n.depths?t!=n.depths[0]?[t].concat(n.depths):n.depths:[t]),(d=l(e.main,d,r,n.depths||[],a,u))(t,n)}return s.isTop=!0,s._setup=function(n){n.partial?(r.helpers=n.helpers,r.partials=n.partials,r.decorators=n.decorators):(r.helpers=r.merge(n.helpers,t.helpers),e.usePartial&&(r.partials=r.merge(n.partials,t.partials)),(e.usePartial||e.useDecorators)&&(r.decorators=r.merge(n.decorators,t.decorators)))},s._child=function(t,n,i,s){if(e.useBlockParams&&!i)throw new a.default("must pass block params");if(e.useDepths&&!s)throw new a.default("must pass parent depths");return o(r,t,e[t],n,0,i,s)},s},t.wrapProgram=o,t.resolvePartial=function(e,t,r){e?e.call||r.name||(r.name=e,e=r.partials[e]):e="@partial-block"===r.name?r.data["partial-block"]:r.partials[r.name];return e},t.invokePartial=function(e,t,r){var o=r.data&&r.data["partial-block"];r.partial=!0,r.ids&&(r.data.contextPath=r.ids[0]||r.data.contextPath);var l=void 0;r.fn&&r.fn!==s&&function(){r.data=i.createFrame(r.data);var e=r.fn;l=r.data["partial-block"]=function(t){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return r.data=i.createFrame(r.data),r.data["partial-block"]=o,e(t,r)},e.partials&&(r.partials=n.extend({},r.partials,e.partials))}();void 0===e&&l&&(e=l);if(void 0===e)throw new a.default("The partial "+r.name+" could not be found");if(e instanceof Function)return e(t,r)},t.noop=s;var n=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(0)),a=function(e){return e&&e.__esModule?e:{default:e}}(r(1)),i=r(2);function o(e,t,r,n,a,i,o){function s(t){var a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=o;return!o||t==o[0]||t===e.nullContext&&null===o[0]||(s=[t].concat(o)),r(e,t,e.helpers,e.partials,a.data||n,i&&[a.blockParams].concat(i),s)}return(s=l(r,s,e,o,n,i)).program=t,s.depth=o?o.length:0,s.blockParams=a||0,s}function s(){return""}function l(e,t,r,a,i,o){if(e.decorator){var s={};t=e.decorator(t,s,r,a&&a[0],i,o,a),n.extend(t,s)}return t}},function(e,t,r){"use strict";(function(r){t.__esModule=!0,t.default=function(e){var t=void 0!==r?r:window,n=t.Handlebars;e.noConflict=function(){return t.Handlebars===e&&(t.Handlebars=n),e}},e.exports=t.default}).call(this,r(24))},function(e,t){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(r=window)}e.exports=r}])});
//# sourceMappingURL=pcards.js.map