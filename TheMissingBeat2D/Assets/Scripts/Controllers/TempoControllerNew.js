#pragma strict

public var finish : AudioClip;
private var finished : boolean = false;

private var beatObjects : GameObject;
private var ballObject : GameObject;
private var beatsPerMinute : int = 90;
public var timeFactor : float = 1;
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

//private var loopDrum : float[];
public var audioM : AudioSource;
//private var audioD : AudioSource;
//private var drumPosition : int = 1;

//private var lastMusicDivD : int = 0;

private var beatTime : float = 0;
private var beatCount : int = -1;



function Start () {
	beatObjects = GameObject.FindGameObjectWithTag("BeatMaster");
	ballObject = GameObject.FindGameObjectWithTag("Gear");
	audioM.Play();	
	
	beatsPerMinute *= timeFactor;
	beatTime += timeOffset*(60.0/beatsPerMinute);
}

function Update () {
	//Avanza el tiempo
	beatTime += Time.deltaTime;
	//Cuando llegamos a los 60 segundos de cancion ira el doble de rapido
	if (!changedFrequency && audioM.time > 60) BroadcastFrequency(--freq);

	//Si hacemos un beat
	if(beatTime > 60.0/beatsPerMinute) {
		beatTime -= 60.0/beatsPerMinute;
		++beatCount;
		if (!audioM.isPlaying) {
			audioM.Play();
		}
		BroadcastBeat(beatCount);
	}
	
	timePlay += Time.deltaTime;
	
	if (audioM.time > 122) Application.LoadLevel(Application.loadedLevel);

}

function BroadcastBeat(beat : int) {
	beatObjects.BroadcastMessage("Beat", beat);//OLD, TESTING
	//ballObject.SendMessage("Beat", beat);
}

function BroadcastFrequency(frequency : float)  {
	beatObjects.BroadcastMessage("ChangeFrequency", frequency);
	//ballObject.SendMessage("ChangeFrequency", frequency);

	changedFrequency = true;
}

/*function OnGUI() {
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
				//var rank : Ranking = gameObject.GetComponent("Ranking");
				//rank.Rankea(myName, finishTime);
				//gameObject.SendMessage("Rankea", arr);
				rankeado = true;
			}
		}
   		
	}
	

}*/

function Finish() {
	finishTime = timePlay-lifeTime;
	audio.Stop();
	//audioD.Stop();
	audio.clip = finish;
	audio.loop = true;
	audio.Play();
	finished = true;
}