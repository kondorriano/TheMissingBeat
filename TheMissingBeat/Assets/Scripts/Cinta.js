#pragma strict


public var direction : float = 1;
private var speed : float = 0;
private var deAcc : float = 10;
private var beatIntensity : float = 5;
private var freq : float = 2;
private var impulse : float = 4;

private var player : GameObject;

function Update () {
	speed = Mathf.Lerp(speed, 0, Time.deltaTime*deAcc);

	transform.parent.renderer.material.mainTextureOffset.x += direction*speed*Time.deltaTime;
}

function OnTriggerEnter (col : Collider) {
	if (col.gameObject.tag == "Player") {
		col.gameObject.SendMessage("Move", false);
	}
}

function OnTriggerExit (col : Collider) {
	if (col.gameObject.tag == "Player") {
		col.gameObject.SendMessage("Move", true);
		
		player = null;
	}
}

function OnTriggerStay (col : Collider) {
	if (col.gameObject.tag == "Player") {
		player = col.gameObject;
	}
}

function OnDrawGizmos () {
	Gizmos.DrawLine(transform.position, transform.position + transform.right*5);
}

function Beat (beat : int) {
	if (beat%freq == 0) {
		speed = beatIntensity;
		
		if (player != null) player.rigidbody.velocity += transform.right*impulse;
	}
}

function ChangeFrequency(frequency : float) {
	freq = frequency;
}