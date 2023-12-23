this.mfModules=this.mfModules||{},this.mfModules["mobile.special.watchlist.scripts"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"./src/mobile.special.watchlist.scripts/WatchList.js":function(t,i,s){var e=s("./src/mobile.startup/mfExtend.js"),n=s("./src/mobile.startup/PageList.js"),l=s("./src/mobile.startup/watchstar/WatchstarPageList.js"),r=s("./src/mobile.startup/ScrollEndEventEmitter.js"),a=s("./src/mobile.startup/util.js"),o=s("./src/mobile.special.watchlist.scripts/WatchListGateway.js");function c(t){var i,s=a.extend({},{isBorderBox:!1},t);this.scrollEndEventEmitter=new r(s.eventBus),this.scrollEndEventEmitter.on(r.EVENT_SCROLL_END,this._loadPages.bind(this)),s.el&&(i=this.getLastTitle(s.el)),this.gateway=new o(s.api,i),l.call(this,s)}e(c,l,{preRender:function(){this.scrollEndEventEmitter.disable(),this.scrollEndEventEmitter.setElement(this.$el)},postRender:function(){var t,i;n.prototype.postRender.apply(this),t=this.queryUnitializedItems(),i=Object.keys(this.parsePagesFromItems(t)).reduce((function(t,i){return t[i]=!0,t}),{}),this.renderItems(t,i),this.scrollEndEventEmitter.enable()},_loadPages:function(){this.gateway.loadWatchlist().then(function(t){t.forEach(function(t){this.appendPage(t)}.bind(this)),this.render()}.bind(this))},appendPage:function(t){var i=a.extend({},t,{wikidataDescription:void 0});this.$el.append(this.templatePartials.item.render(i))},getLastTitle:function(t){return t.find("li").last().attr("title")}}),t.exports=c},"./src/mobile.special.watchlist.scripts/WatchListGateway.js":function(t,i,s){var e=s("./src/mobile.startup/page/pageJSONParser.js"),n=s("./src/mobile.startup/util.js"),l=s("./src/mobile.startup/extendSearchParams.js");function r(t,i){this.api=t,this.limit=50,i?(this.continueParams={continue:"gwrcontinue||",gwrcontinue:"0|"+i.replace(/ /g,"_")},this.shouldSkipFirstTitle=!0):(this.continueParams={continue:""},this.shouldSkipFirstTitle=!1),this.canContinue=!0}r.prototype={loadWatchlist:function(){var t=this,i=l("watchlist",{prop:["info","revisions"],rvprop:"timestamp|user",generator:"watchlistraw",gwrnamespace:"0",gwrlimit:this.limit},this.continueParams);return!1===this.canContinue?n.Deferred().resolve([]):this.api.get(i,{url:this.apiUrl}).then((function(i){return void 0!==i.continue?t.continueParams=i.continue:t.canContinue=!1,t.parseData(i)}))},parseData:function(t){var i;return t.query&&t.query.pages?((i=t.query.pages).sort((function(t,i){return t.title===i.title?0:t.title<i.title?-1:1})),this.shouldSkipFirstTitle&&(i=i.slice(1),this.shouldSkipFirstTitle=!1),i.map(e.parse)):[]}},t.exports=r},"./src/mobile.special.watchlist.scripts/mobile.special.watchlist.scripts.js":function(t,i,s){var e=s("./src/mobile.special.watchlist.scripts/WatchList.js"),n=s("./src/mobile.startup/eventBusSingleton.js");$((function(){var t;t=$("ul.mw-mf-watchlist-page-list"),0===$(".mw-mf-watchlist-selector").length&&new e({api:new mw.Api,el:t,funnel:"watchlist",skipTemplateRender:!0,eventBus:n}),t.find(".mw-mf-watchlist-more").remove()}))},"./src/mobile.startup/ScrollEndEventEmitter.js":function(t,i,s){var e=s("./src/mobile.startup/util.js"),n=s("./src/mobile.startup/mfExtend.js");function l(t,i){this.threshold=i||100,this.eventBus=t,this.enable(),OO.EventEmitter.call(this)}OO.mixinClass(l,OO.EventEmitter),l.EVENT_SCROLL_END="ScrollEndEventEmitter-scrollEnd",n(l,{_bindScroll:function(){this._scrollHandler||(this._scrollHandler=this._onScroll.bind(this),this.eventBus.on("scroll:throttled",this._scrollHandler))},_unbindScroll:function(){this._scrollHandler&&(this.eventBus.off("scroll:throttled",this._scrollHandler),this._scrollHandler=null)},_onScroll:function(){this.$el&&this.enabled&&this.scrollNearEnd()&&(this.disable(),this.emit(l.EVENT_SCROLL_END))},scrollNearEnd:function(){var t=e.getWindow(),i=t.scrollTop()+t.height(),s=this.$el.offset().top+this.$el.outerHeight();return i+this.threshold>s},enable:function(){this.enabled=!0,this._bindScroll()},disable:function(){this.enabled=!1,this._unbindScroll()},setElement:function(t){this.$el=t}}),t.exports=l}},[["./src/mobile.special.watchlist.scripts/mobile.special.watchlist.scripts.js",0,1]]]);
//# sourceMappingURL=mobile.special.watchlist.scripts.js.map.json