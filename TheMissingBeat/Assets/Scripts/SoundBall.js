#pragma strict
public var tempo : int = 180;
private var beatsPerSecond : float;

private var cont : float = 0;

function Start () {
	beatsPerSecond = 60.0/180;
	Debug.Log(beatsPerSecond);
}

function Update () {
	cont += Time.deltaTime;
	if(cont >= beatsPerSecond) {
			audio.PlayOneShot(audio.clip, 1);
			cont -= beatsPerSecond;

	}
}