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

function Start () {
	beatObjects = GameObject.FindGameObjectWithTag("BeatMaster");
	ballObject = GameObject.FindGameObjectWithTag("Gear");
	timeSamplesOffset = timeOffset*44100;

	//audio.velocityUpdateMode = AudioVelocityUpdateMode.Dynamic;
}

function Update () {
	timePlay += Time.deltaTime;
	var input : boolean = Input.anyKey;
	
	if (audio.time > 122) Application.LoadLevel(Application.loadedLevel);
	
	if (!changedFrequency && audio.time > 60) BroadcastFrequency(--freq);
	
	if (input || shouldFinish || finished) {
		if (!audio.isPlaying) {
			audio.Play();
		}
		if (input) shouldFinish = true;
		
		var musicDiv : int = (audio.timeSamples + timeSamplesOffset) / beatSamples + 1;
		
		if (musicDiv > lastMusicDiv) {
			BroadcastBeat(musicDiv);
		}
		else {
			if ((((audio.timeSamples + timeSamplesOffset) + 5*441)/beatSamples + 1) > lastMusicDiv && lastMusicDiv%freq == 0) shouldFinish = false;
		}
		
		lastMusicDiv = musicDiv;
	}
	else if (audio.isPlaying) {
		audio.Pause();
	}
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
	lifeTime = audio.clip.length-audio.time;
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
	audio.clip = finish;
	audio.loop = true;
	audio.Play();
	finished = true;
}