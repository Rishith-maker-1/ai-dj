song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftW=0;
scoreRightW=0;
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');
    if(scoreLeftW>0.2){
        circle(leftWristX,leftWristY,20);
        numberlefty=Number(leftWristY);
        remove_decimals=floor(numberlefty);
        volume=remove_decimals/500;
        document.getElementById("vol").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }
    if(scoreRightW>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }else if(rightWristY>101 && rightWristY<=200){
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }else if(rightWristY>201 && rightWristY<=300){
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }else if(rightWristY>301 && rightWristY<=400){
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }else if(rightWristY>401 && rightWristY<=500){
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftW=results[0].pose.keypoints[9].score;
        scoreRightW=results[0].pose.keypoints[10].score;
        console.log("Score of left wrist is - "+scoreLeftW);
        console.log("Score of right wrist is - "+scoreRightW);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX + "left wrist y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristX + "right wrist y = " + rightWristY);
    }
}

function preload() {
    song = loadSound("music.mp3");
}