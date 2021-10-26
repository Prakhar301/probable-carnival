song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.position(700,200);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("PoseNet Initalized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Left Wrist X="+leftWristX+"Left Wrist Y="+leftWristY);
        console.log("Right Wrist X="+rightWristX+"Right Wrist Y="+rightWristY);
    }
    else{
        document.getElementById("danger").innerHTML="There is some problem";
    }
}
function draw(){
    image(video,0,0,400,400);
    fill('#52ffab');
    stroke('#ae4deb');
    circle(leftWristX,leftWristY,20);
    newLeftWristY=Number(leftWristY);
    finalLeftWristY=floor(newLeftWristY);
    volume=45;
    document.getElementById("htv").innerHTML="Volume:"+volume;
    song.setVolume(volume);
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}