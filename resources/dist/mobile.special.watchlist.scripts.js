(self.webpackChunkmfModules=self.webpackChunkmfModules||[]).push([[601],{"./src/mobile.special.watchlist.scripts/ScrollEndEventEmitter.js":(t,s,i)=>{var e=i("./src/mobile.startup/util.js"),l=i("./src/mobile.startup/mfExtend.js");function r(t,s){this.threshold=s||100,this.eventBus=t,this.enable(),OO.EventEmitter.call(this)}OO.mixinClass(r,OO.EventEmitter),r.EVENT_SCROLL_END="ScrollEndEventEmitter-scrollEnd",l(r,{_bindScroll:function(){this._scrollHandler||(this._scrollHandler=this._onScroll.bind(this),this.eventBus.on("scroll:throttled",this._scrollHandler))},_unbindScroll:function(){this._scrollHandler&&(this.eventBus.off("scroll:throttled",this._scrollHandler),this._scrollHandler=null)},_onScroll:function(){this.$el&&this.enabled&&this.scrollNearEnd()&&(this.disable(),this.emit(r.EVENT_SCROLL_END))},scrollNearEnd:function(){if(!this.$el||!this.$el.offset())return!1;var t=e.getWindow(),s=t.scrollTop()+t.height(),i=this.$el.offset().top+this.$el.outerHeight();return s+this.threshold>i},enable:function(){this.enabled=!0,this._bindScroll()},disable:function(){this.enabled=!1,this._unbindScroll()},setElement:function(t){this.$el=t}}),t.exports=r},"./src/mobile.special.watchlist.scripts/WatchList.js":(t,s,i)=>{var e=i("./src/mobile.startup/mfExtend.js"),l=i("./src/mobile.startup/PageList.js"),r=i("./src/mobile.startup/watchstar/WatchstarPageList.js"),n=i("./src/mobile.special.watchlist.scripts/ScrollEndEventEmitter.js"),a=i("./src/mobile.startup/util.js"),c=i("./src/mobile.special.watchlist.scripts/WatchListGateway.js");function o(t){var s,i=a.extend({},{isBorderBox:!1},t);this.scrollEndEventEmitter=new n(i.eventBus),this.scrollEndEventEmitter.on(n.EVENT_SCROLL_END,this._loadPages.bind(this)),i.el&&(s=this.getLastTitle(i.el)),this.gateway=new c(i.api,s),r.call(this,i)}e(o,r,{preRender:function(){this.scrollEndEventEmitter.disable(),this.scrollEndEventEmitter.setElement(this.$el)},postRender:function(){var t,s;l.prototype.postRender.apply(this),t=this.queryUnitializedItems(),s=Object.keys(this.parsePagesFromItems(t)).reduce((function(t,s){return t[s]=!0,t}),{}),this.renderItems(t,s),this.scrollEndEventEmitter.enable()},_loadPages:function(){this.gateway.loadWatchlist().then(function(t){t.forEach(function(t){this.appendPage(t)}.bind(this)),this.render()}.bind(this))},appendPage:function(t){var s=a.extend({},t,{wikidataDescription:void 0,lastModified:void 0});this.$el.append(this.templatePartials.item.render(s))},getLastTitle:function(t){return t.find("li").last().attr("title")}}),t.exports=o},"./src/mobile.special.watchlist.scripts/WatchListGateway.js":(t,s,i)=>{var e=i("./src/mobile.startup/page/pageJSONParser.js"),l=i("./src/mobile.startup/util.js"),r=i("./src/mobile.startup/extendSearchParams.js");function n(t,s){this.api=t,this.limit=50,s?(this.continueParams={continue:"gwrcontinue||",gwrcontinue:"0|"+s.replace(/ /g,"_")},this.shouldSkipFirstTitle=!0):(this.continueParams={continue:""},this.shouldSkipFirstTitle=!1),this.canContinue=!0}n.prototype={loadWatchlist:function(){var t=this,s=r("watchlist",{prop:["info","revisions"],rvprop:"timestamp|user",generator:"watchlistraw",gwrnamespace:"0",gwrlimit:this.limit},this.continueParams);return!1===this.canContinue?l.Deferred().resolve([]):this.api.get(s).then((function(s){return void 0!==s.continue?t.continueParams=s.continue:t.canContinue=!1,t.parseData(s)}))},parseData:function(t){var s;return t.query&&t.query.pages?((s=t.query.pages).sort((function(t,s){return t.title===s.title?0:t.title<s.title?-1:1})),this.shouldSkipFirstTitle&&(s=s.slice(1),this.shouldSkipFirstTitle=!1),s.map(e.parse)):[]}},t.exports=n},"./src/mobile.special.watchlist.scripts/mobile.special.watchlist.scripts.js":(t,s,i)=>{var e=i("./src/mobile.special.watchlist.scripts/WatchList.js"),l=i("./src/mobile.startup/eventBusSingleton.js");$((function(){var t;t=$("ul.mw-mf-watchlist-page-list"),0===$(".mw-mf-watchlist-selector").length&&new e({api:new mw.Api,el:t,funnel:"watchlist",skipTemplateRender:!0,eventBus:l}),t.find(".mw-mf-watchlist-more").remove()}))}},t=>{t.O(0,[569],(()=>("./src/mobile.special.watchlist.scripts/mobile.special.watchlist.scripts.js",t(t.s="./src/mobile.special.watchlist.scripts/mobile.special.watchlist.scripts.js"))));var s=t.O();(this.mfModules=this.mfModules||{})["mobile.special.watchlist.scripts"]=s}]);
//# sourceMappingURL=mobile.special.watchlist.scripts.js.map.json