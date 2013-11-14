#pragma strict

public var finish : AudioClip;
private var finished : boolean = false;

private var beatObjects : GameObject;
private var ballObject : GameObject;
private var beatsPerMinute : int = 90;
private var beatSamples : int = 44100*60/beatsPerMinute;

public var timeOffset : float = 0;
private var timeSamplesOffset : int = 0;

private var lastMusicDiv : int = 0;
private var shouldFinish : boolean = false;

private var changedFrequency : boolean = false;
private var finishTime : float;
private var timePlay : float;
private var lifeTime : int;

private var freq : int = 2;

private var myName : String = "Someone";
private var rankeado : boolean = false;

//New

private var loopDrum : float[];
private var audioM : AudioSource;
private var audioD : AudioSource;
private var drumPosition : int = 1;

private var lastMusicDivD : int = 0;

private var beatTime : float = 0;
private var beatCount : int = -1;



function Start () {
	beatObjects = GameObject.FindGameObjectWithTag("BeatMaster");
	ballObject = GameObject.FindGameObjectWithTag("Gear");
	timeSamplesOffset = timeOffset*44100;
	
	//New
	var aSources = GetComponents(AudioSource);
	audioM = aSources[0];
	audioD = aSources[1];
	loopDrum = new float[17];
	loopDrum[0] = 0;
	loopDrum[1] = 8;	
	loopDrum[2] = 24;
	loopDrum[3] = 32;
	loopDrum[4] = 40;
	loopDrum[5] = 48;	
	loopDrum[6] = 56;
	loopDrum[7] = 59;
	loopDrum[8] = 75;
	loopDrum[9] = 91;
	loopDrum[10] = 99;
	loopDrum[11] = 107;
	loopDrum[12] = 123;
	loopDrum[13] = 139;
	loopDrum[14] = 151;
	loopDrum[15] = 167;
	loopDrum[16] = 184;
	
	/*loopDrum[0] = 0.0;
	loopDrum[1] = 5.33;	
	loopDrum[2] = 16;
	loopDrum[3] = 21.33;
	loopDrum[4] = 26.666;
	loopDrum[5] = 32;	
	loopDrum[6] = 36.666;
	loopDrum[7] = 39.333;
	loopDrum[8] = 50;
	loopDrum[9] = 60.666;
	loopDrum[10] = 66;
	loopDrum[11] = 71.33;
	loopDrum[12] = 82;
	loopDrum[13] = 92.666;
	loopDrum[14] = 100.666;
	loopDrum[15] = 111.333;
	loopDrum[16] = 123;*/
	
	audioD.time = (60.0/90.0)*loopDrum[0];
	audioD.Play();
	

	//audio.velocityUpdateMode = AudioVelocityUpdateMode.Dynamic;
}

function Update () {
	//New
	beatTime += Time.deltaTime;
	if (!changedFrequency && audioM.time > 60) BroadcastFrequency(--freq);

	if(beatTime > 60.0/beatsPerMinute) {
		beatTime -= 60.0/beatsPerMinute;
		var input = Input.anyKey;
		if(input || (beatCount%freq == 0 && freq == 2) || finished) {
			++beatCount;
			if (!audioM.isPlaying) {
				audioM.Play();
			}
			BroadcastBeat(beatCount);

		} else audioM.Pause();
		
			
	}
	if(audioD.time > (60.0/90.0)*loopDrum[drumPosition]) {
		audioD.time -= (60.0/90.0)*(loopDrum[drumPosition])-(60.0/90.0)*(loopDrum[drumPosition-1]);
	}
	if(audioM.time > (60.0/90.0)*loopDrum[drumPosition]) {
		++drumPosition;
		audioD.time = audioM.time;		
	}
	
	timePlay += Time.deltaTime;
	
	//var input : boolean = Input.anyKey;
	//var input : boolean = Input.anyKey && (((((audioD.timeSamples + timeSamplesOffset) + 5*441)/beatSamples + 1) > lastMusicDivD && lastMusicDivD%1 == 0));
	//lastMusicDivD = (audioD.timeSamples + timeSamplesOffset) / beatSamples + 1;
	
	if (audioM.time > 122) Application.LoadLevel(Application.loadedLevel);
	
	/*
	if (input || shouldFinish || finished) {
		if (!audioM.isPlaying) {
			audioM.Play();
		}
		if (input) shouldFinish = true;
		
		var musicDiv : int = (audioM.timeSamples + timeSamplesOffset) / beatSamples + 1;
		
		if (musicDiv > lastMusicDiv) {
			BroadcastBeat(musicDiv);
		}
		else {
			if ((((audioM.timeSamples + timeSamplesOffset) + 5*441)/beatSamples + 1) > lastMusicDiv && lastMusicDiv%freq == 0) shouldFinish = false;
		}
		
		lastMusicDiv = musicDiv;
	}
	else if (audioM.isPlaying) {
		audioM.Pause();
	}*/
}

function BroadcastBeat(beat : int) {
	beatObjects.BroadcastMessage("Beat", beat);//OLD, TESTING
	ballObject.SendMessage("Beat");
	
	
}

function BroadcastFrequency(frequency : float)  {
	beatObjects.BroadcastMessage("ChangeFrequency", frequency);
	changedFrequency = true;
}

function OnGUI() {
	GUI.color = Color.white;
	lifeTime = audioM.clip.length-audioM.time;
	if (!finished) {
		GUI.Label(Rect(10,30,100,20), "LifeTime: "+lifeTime);
		GUI.Label(Rect(10,50,100,20), "Time: "+timePlay.ToString("F3"));

	} else {
		GUI.Label(Rect(10,30,200,20), "Your Score: "+finishTime.ToString("F3"));
		if(!rankeado) {
			myName = GUI.TextField(Rect (10, 60, 100, 20), myName, 25);		
			if(GUI.Button(Rect(10, 90, 100, 20), "Submit score")) {
				//var arr = new Array();

				//arr.push(finishTime.ToString("F2"));
				//arr.push(myName);
				var rank : Ranking = gameObject.GetComponent("Ranking");
				rank.Rankea(myName, finishTime);
				//gameObject.SendMessage("Rankea", arr);
				rankeado = true;
			}
		}
   		
	}
	

}

function Finish() {
	finishTime = timePlay-lifeTime;
	audio.Stop();
	audioD.Stop();
	audio.clip = finish;
	audio.loop = true;
	audio.Play();
	finished = true;
}