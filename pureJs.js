function MouseMoveEvent(){

    function getX(obj){
        var parObj=obj;
        var left=obj.offsetLeft;
        while(parObj=parObj.offsetParent){
            left+=parObj.offsetLeft;
        }
        return left;
    }

    function getY(obj){
        var parObj=obj;
        var top=obj.offsetTop;
        while(parObj = parObj.offsetParent){
            top+=parObj.offsetTop;
        }
        return top;
    }


    var canvas=document.getElementsByTagName("canvas")[0];
    var ctx;
    ctx=canvas.getContext("2d");
    var oDiv;
    oDiv=document.getElementById("imagePreView");
    var startX,startY,preX,preY,endX,endY;
    var originalData=[];


    $("canvas").bind("mousedown",function(e){  //initialize startX startY, endX endY
        if(buttonId=="select"&& e.which===1){
            var top=getY(oDiv);
            var left=getX(oDiv);
            down = 1;
            startX=(e.clientX-left+document.body.scrollLeft);
            startY=(e.clientY-top+document.body.scrollTop);
            preX=startX;
            preY=startY;
            endX=0;
            endY=0;

        };
    })
    $("canvas").bind("mousemove",function(e){
        var top=getY(oDiv);
        var left=getX(oDiv);
        if(buttonId=="select"){
            if(down==1 ){ //left click
            }
                //clear content
                var selectWidth=Math.sqrt((preX-startX)*(preX-startX));
                var selectHeight=Math.sqrt((preY-startY)*(preY-startY));
                if (selectWidth!==0){  //selectWidth && selectHeight cannot 0
                    var selectImgData=ctx.getImageData(startX,startY,selectWidth,selectHeight);
                    var selectData=selectImgData.data;
                    for(var j=0;j<=selectHeight;j++){
                        for(var i=0;i<=selectWidth;i++){
                            var pixelOffset= (j * selectWidth+ i) * 4;
                            selectData[pixelOffset+3]=originalData[pixelOffset+3];
                        }
                    }
                    ctx.putImageData(selectImgData,startX,startY);
                }
                // recreate content
                endX = (e.clientX-left+document.body.scrollLeft); //get newPoint Value
                endY = (e.clientY-top+document.body.scrollTop);
                var selectWidth=Math.sqrt((endX-startX)*(endX-startX));
                var selectHeight=Math.sqrt((endY-startY)*(endY-startY));
                var selectImgData=ctx.getImageData(startX,startY,selectWidth,selectHeight);
                var selectData=selectImgData.data;
                for(var j=0;j<selectHeight;j++){
                    for(var i=0;i<selectWidth;i++){
                        var pixelOffset= (j * selectWidth+ i) * 4;
                        originalData[pixelOffset+3]= selectData[pixelOffset+3];
                        selectData[pixelOffset+3]=127;
                    }
                }
                ctx.putImageData(selectImgData,startX,startY);
                preX=endX;
                preY=endY;

        };


    })

    $("canvas").bind("mouseup",function(){
        down=0;
    });

    $("canvas").mousedown(function(e){
        if(e.which === 3){
            down=1;
            var selectWidth=Math.sqrt((preX-startX)*(preX-startX));
            var selectHeight=Math.sqrt((preY-startY)*(preY-startY));
            if (selectWidth!==0){
                var selectImgData=ctx.getImageData(startX,startY,selectWidth,selectHeight);
                var selectData=selectImgData.data;
                for(var j=0;j<=selectHeight;j++){
                    for(var i=0;i<=selectWidth;i++){
                        var pixelOffset= (j * selectWidth+ i) * 4;
                        selectData[pixelOffset+3]=originalData[pixelOffset+3];
                    }
                }
                ctx.putImageData(selectImgData,startX,startY);
                down=0;
            }
        }
    })

    document.oncontextmenu=RightMouseDown; //disable rightClick menu
    function RightMouseDown() { return false;}
}