#pragma strict

private var beatObjects : GameObject;
private var player : GameObject;
private var beatsPerMinute : int = 90;
private var lastBeatSamples : float = 0;
private var beatSamples : float = 44100.0f*60.0f/beatsPerMinute;

public var audioM : AudioSource;
public var finish : AudioClip;


private var beatTime : float = 0;
private var beatCount : int = -1;

private var contraTempo : boolean = false;

private var changedFrequency : boolean = false;




function Start () {
	beatObjects = GameObject.FindGameObjectWithTag("BeatMaster");
	player = GameObject.FindGameObjectWithTag("Player");
	//player.SendMessage("SetBeatLength", GetBeatLength());
	
	audioM.Play();
	
	//player.SendMessage("SetTimeBetweenBeats", 60.0f/beatsPerMinute);
}

function Update () {
	if (!changedFrequency && audioM.time > 60) BroadcastFrequency(1);

	if(audioM.timeSamples > lastBeatSamples + beatSamples) {
		++beatCount;
		if (!audioM.isPlaying) {
			audioM.Play();
		}
		lastBeatSamples += beatSamples;
		BroadcastBeat(beatCount);
		contraTempo = false;
	}
	else if (!contraTempo && audioM.timeSamples >= lastBeatSamples + beatSamples/2) { // ContraTempo
		//player.SendMessage("ContraBeat", beatCount);
		contraTempo = true;
	}
}

function BroadcastBeat(beatCount : int) {
	beatObjects.BroadcastMessage("Beat", beatCount);
	player.BroadcastMessage("Beat", beatCount);
}

function BroadcastFrequency(frequency : float)  {
	beatObjects.BroadcastMessage("ChangeFrequency", frequency);
	changedFrequency = true;
}


function GetBeatLength() : float {
	return beatsPerMinute/60.0f;
}

function Finish() {
	audioM.Stop();
	audioM.clip = finish;
	audioM.loop = true;
	audioM.Play();
	lastBeatSamples = 0;
}