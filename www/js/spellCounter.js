/*
 * jQuery Mobile Framework : plugin to provide a number spinner.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-spinbox
 */
(function(a){a.widget("mobile.spinbox",{options:{dmin:false,dmax:false,step:false,theme:false,mini:null,repButton:true,version:"1.4.4-2015092400",initSelector:"input[data-role='spinbox']",clickEvent:"vclick",type:"horizontal",},_decimalPlaces:function(c){var b=(""+c).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);if(!b){return 0}return Math.max(0,(b[1]?b[1].length:0)-(b[2]?+b[2]:0))},_sbox_run:function(){var b=this,c=150;if(b.g.cnt>10){c=100}if(b.g.cnt>30){c=50}if(b.g.cnt>60){c=20}b.g.didRun=true;b._offset(this,b.g.delta);b.g.cnt++;b.runButton=setTimeout(function(){b._sbox_run()},c)},_offset:function(e,d){var c,b=this,f=this.options;if(!b.disabled){if(d<1){c=(parseFloat(b.d.input.val())-f.step).toFixed(b.places);if(c>=f.dmin){b.d.input.val(c).trigger("change")}}else{c=(parseFloat(b.d.input.val())+f.step).toFixed(b.places);if(c<=f.dmax){b.d.input.val(c).trigger("change")}}}},_create:function(){var b=this,f=a.extend(this.options,this.element.data("options")),e={input:this.element,inputWrap:this.element.parent()},g=(typeof window.ontouchstart!=="undefined"),c={eStart:(g?"touchstart":"mousedown")+".spinbox",eMove:(g?"touchmove":"mousemove")+".spinbox",eEnd:(g?"touchend":"mouseup")+".spinbox",eEndA:(g?"mouseup.spinbox touchend.spinbox touchcancel.spinbox touchmove.spinbox":"mouseup.spinbox"),move:false,start:false,end:false,pos:false,target:false,delta:false,tmp:false,cnt:0};b.d=e;b.g=c;f.theme=((f.theme===false)?a.mobile.getInheritedTheme(this.element,"a"):f.theme);if(b.d.input.prop("disabled")){f.disabled=true}if(f.dmin===false){f.dmin=(typeof b.d.input.attr("min")!=="undefined")?parseInt(b.d.input.attr("min"),10):Number.MAX_VALUE*-1}if(f.dmax===false){f.dmax=(typeof b.d.input.attr("max")!=="undefined")?parseInt(b.d.input.attr("max"),10):Number.MAX_VALUE}if(f.step===false){f.step=(typeof b.d.input.attr("step")!=="undefined")?parseFloat(b.d.input.attr("step")):1;b.places=b._decimalPlaces(f.step)}f.mini=(f.mini===null?(b.d.input.data("mini")?true:false):f.mini);b.d.wrap=a("<div>",{"data-role":"controlgroup","data-type":f.type,"data-mini":f.mini,"data-theme":f.theme}).insertBefore(b.d.inputWrap).append(b.d.inputWrap);b.d.inputWrap.addClass("ui-btn");b.d.input.css({textAlign:"center"});if(f.type!=="vertical"){b.d.inputWrap.css({padding:f.mini?"1px 0":"4px 0 3px"});b.d.input.css({width:f.mini?"40px":"50px"})}else{b.d.wrap.css({width:"auto"});b.d.inputWrap.css({padding:0})}b.d.up=a("<div>",{"class":"ui-btn ui-icon-plus ui-btn-icon-notext"}).html("&nbsp;");b.d.down=a("<div>",{"class":"ui-btn ui-icon-minus ui-btn-icon-notext"}).html("&nbsp;");if(f.type!=="vertical"){b.d.wrap.prepend(b.d.down).append(b.d.up)}else{b.d.wrap.prepend(b.d.up).append(b.d.down)}b.d.wrap.controlgroup();if(f.repButton===false){b.d.up.on(f.clickEvent,function(d){d.preventDefault();b._offset(d.currentTarget,1)});b.d.down.on(f.clickEvent,function(d){d.preventDefault();b._offset(d.currentTarget,-1)})}else{b.d.up.on(b.g.eStart,function(d){b.d.input.blur();b._offset(d.currentTarget,1);b.g.move=true;b.g.cnt=0;b.g.delta=1;if(!b.runButton){b.g.target=d.currentTarget;b.runButton=setTimeout(function(){b._sbox_run()},500)}});b.d.down.on(b.g.eStart,function(d){b.d.input.blur();b._offset(d.currentTarget,-1);b.g.move=true;b.g.cnt=0;b.g.delta=-1;if(!b.runButton){b.g.target=d.currentTarget;b.runButton=setTimeout(function(){b._sbox_run()},500)}});b.d.up.on(b.g.eEndA,function(d){if(b.g.move){d.preventDefault();clearTimeout(b.runButton);b.runButton=false;b.g.move=false}});b.d.down.on(b.g.eEndA,function(d){if(b.g.move){d.preventDefault();clearTimeout(b.runButton);b.runButton=false;b.g.move=false}})}if(typeof a.event.special.mousewheel!=="undefined"){b.d.input.on("mousewheel",function(h,i){h.preventDefault();b._offset(h.currentTarget,(i<0?-1:1))})}if(f.disabled){b.disable()}},disable:function(){var b=this.d,c="ui-state-disabled";b.input.attr("disabled",true).blur();b.inputWrap.addClass(c);b.up.addClass(c);b.down.addClass(c);this.options.disabled=true},enable:function(){var b=this.d,c="ui-state-disabled";b.input.attr("disabled",false);b.inputWrap.removeClass(c);b.up.removeClass(c);b.down.removeClass(c);this.options.disabled=false}})})(jQuery);



jQuery.fn.onSpinChange = function(counterValueLocation, maxValueLocation){

    return this.each(function(){
        if (typeof maxValueLocation === 'string' && maxValueLocation !== "" && maxValueLocation <= 99 ) {
            this.value = maxValueLocation;
            counterValueLocation = maxValueLocation;
        } else {
            $(this).next(".spellBookSpellSet").value = 0;
            counterValueLocation = 0;
            maxValueLocation = 0;
        }
    });
};

$("#spin0").onSpinChange(localStorage.lvlZeroValue,localStorage.lvlZeroMaxValue);

$("#spin1").onSpinChange(localStorage.lvlOneValue,localStorage.lvlOneMaxValue);

$("#spin2").onSpinChange(localStorage.lvlTwoValue,localStorage.lvlTwoMaxValue);

$("#spin3").onSpinChange(localStorage.lvlThreeValue,localStorage.lvlThreeMaxValue);

$("#spin4").onSpinChange(localStorage.lvlFourValue,localStorage.lvlFourMaxValue);

$("#spin5").onSpinChange(localStorage.lvlFiveValue,localStorage.lvlFiveMaxValue);

$("#spin6").onSpinChange(localStorage.lvlSixValue,localStorage.lvlSixMaxValue);

$("#spin7").onSpinChange(localStorage.lvlSevenValue,localStorage.lvlSevenMaxValue);

$("#spin8").onSpinChange(localStorage.lvlEightValue,localStorage.lvlEightMaxValue);

$("#spin9").onSpinChange(localStorage.lvlNineValue,localStorage.lvlNineMaxValue);
