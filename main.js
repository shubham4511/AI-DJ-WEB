song="";
leftWritsX=0;
leftWritsY=0;
rightWritsX=0;
rightWritsY=0;
scoreLeftWrits=0;
scorerightWrits=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO)
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scorerightWrits>0.2){
    circle(rightWritsX,rightWritsY,20);
    if(rightWritsY > 0 && rightWritsY <= 100){
        document.getElementById("speed").innerHTML="speed=0.5";
        song.rate(0.5); 
    }
    else if(rightWritsY > 100 && rightWritsY <= 200){
        document.getElementById("speed").innerHTML="speed=1";
        song.rate(1); 
    }
    else if(rightWritsY > 200 && rightWritsY <= 300 ){
        document.getElementById("speed").innerHTML="speed=1.5";
        song.rate(1.5); 
    }
    else if(rightWritsY > 300 && rightWritsY <= 400){
        document.getElementById("speed").innerHTML="speed=2";
        song.rate(2); 
    }
    else if(rightWritsY > 400 && rightWritsY <= 500){
        document.getElementById("speed").innerHTML="speed=2.5";
        song.rate(2.5); 
    }
}
    if(scoreLeftWrits>0.2){
    circle(leftWritsX,leftWritsY,20);
    InNumber=Number(leftWritsY);
    remove_decimals=floor(InNumber);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume="+volume;
    song.setVolume(volume);
    }

}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);


}
function modelLoaded(){
    console.log('PoseNet Is Initized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWritsX = results[0].pose.leftWrist.x;
        leftWritsY = results[0].pose.leftWrist.y;
        console.log(" leftWritsX= "+leftWritsX+" leftWritsY= "+leftWritsY);
        rightWritsX = results[0].pose.rightWrist.x;
         righttWritsY = results[0].pose.rightWrist.y;
         console.log("rightWritsX="+rightWritsX+" rightWritsY= "+rightWritsY);
         scoreLeftWrits=results[0].pose.keypoints[9].score;
         console.log("scoreLeftWrits="+scoreLeftWrits);
         scorerightWrits=results[0].pose.keypoints[10].score;
         console.log("scorerightWrits="+scorerightWrits);



    }
}
    
