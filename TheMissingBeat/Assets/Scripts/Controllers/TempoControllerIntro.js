#pragma strict

private var beatObjects : GameObject;
private var ballObject : GameObject;
private var beatsPerMinute : int = 90;
private var beatSamples : int = 44100*60/beatsPerMinute;

private var lastMusicDiv : int = 0;
private var shouldFinish : boolean = false;

private var changedFrequency : boolean = false;

private var freq : int = 2;

function Start () {
	beatObjects = GameObject.FindGameObjectWithTag("BeatMaster");
	ballObject = GameObject.FindGameObjectWithTag("Gear");

	//audio.velocityUpdateMode = AudioVelocityUpdateMode.Dynamic;
}

function Update () {
	var input : boolean = Input.anyKey;
	
	if (!changedFrequency && audio.time > 60) BroadcastFrequency(--freq);
	
	if (input || shouldFinish) {
		if (!audio.isPlaying) {
			audio.Play();
		}
		if (input) shouldFinish = true;
		
		var musicDiv : int = audio.timeSamples / beatSamples + 1;
		
		if (musicDiv > lastMusicDiv) {
			BroadcastBeat(musicDiv);
		}
		else {
			if (((audio.timeSamples + 5*441)/beatSamples + 1) > lastMusicDiv && lastMusicDiv%freq == 0) shouldFinish = false;
		}
		
		lastMusicDiv = musicDiv;
	}
	else if (audio.isPlaying) {
		audio.Pause();
	}
}

function BroadcastBeat(beat : int) {
	beatObjects.BroadcastMessage("Beat", beat);
	ballObject.SendMessage("Beat");
}

function BroadcastFrequency(frequency : float)  {
	beatObjects.BroadcastMessage("ChangeFrequency", frequency);
	changedFrequency = true;
}