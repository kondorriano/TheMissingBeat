#pragma strict

public var speed : float = 5;
public var maxAngularSpeed : float = 30;

public var maxDistance : float = 0.05;

public var fixFloorTag : String = "FixFloor";

private var able : boolean = true;
private var fixFloor : boolean = false;

private var fixTime : float = 0;
public var minFixTime : float = 1;

function Start () {
	rigidbody.maxAngularVelocity = maxAngularSpeed;
}

function Update () {
	if (able) {
		if (rigidbody2D.angularVelocity > -speed)
			rigidbody2D.angularVelocity = -speed;
	}
	
	if (fixFloor || fixTime < minFixTime) {
		if (fixFloor) fixTime = 0;
		
		fixTime += Time.deltaTime;
		
		
		var hit : RaycastHit;
		if (Physics.Raycast(transform.position, -Vector3.up, hit)) {
			if (hit.distance > transform.localScale.y/2 + maxDistance) {
				transform.position.y = hit.point.y + transform.localScale.y/2 + maxDistance;
				rigidbody2D.velocity.y = 0;
			}
		}
	}
}

function Move (b : boolean) {
	able = b;
}

function OnCollisionStay(col : Collision) {
	if (col.gameObject.tag == fixFloorTag) fixFloor = true;
}

function OnCollisionExit(col : Collision) {
	if (col.gameObject.tag == fixFloorTag) fixFloor = false;
}