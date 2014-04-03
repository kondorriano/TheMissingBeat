#pragma strict

private var beatTime : float = 1.0f;

private var beat : float = 0;
private var lastBeatTime : float = 0;

private var initPos : float = 0.0f;

function Start () {
	initPos = transform.position.x;
}

function Update () {
	//	Debug.Log((Time.time - lastBeatTime)/beatTime);
	transform.position.x = initPos + Mathf.Lerp((beat-1.0f)*2.0f, beat*2.0f, Mathf.Min(1.0f, (Time.time - lastBeatTime)/beatTime));
	rigidbody2D.velocity.x = 0.0f;
}

function Beat (b : int) {
	
}

function ContraBeat (b : int) {
	lastBeatTime = Time.time;
	beat = b;
}

function SetTimeBetweenBeats(t : float) {
	beatTime = t;
}