#pragma strict

public var height : float = 5;
public var speed : float = 20;

private var originalPos : Vector3;
private var wantedPos : Vector3;
private var activated : boolean = false;
private var deactivated : boolean = false;

function Start () {
	originalPos = transform.position;
	wantedPos = originalPos + Vector3(0,height,0);
}

function Update () {
	if (activated) {
		if ((wantedPos - transform.position).magnitude < 0.1) {
			transform.position = wantedPos;			
			activated = false;
			deactivated = true;
		} else rigidbody.MovePosition(transform.position + (wantedPos - transform.position)*speed*Time.deltaTime);
	} else if(deactivated) {
		if ((originalPos - transform.position).magnitude < 0.1) {
			transform.position = originalPos;			
			deactivated = false;
		} else rigidbody.MovePosition(transform.position + (originalPos - transform.position)*speed*Time.deltaTime);
	}
}

function Activate (active : boolean) {
	activated = active;
}