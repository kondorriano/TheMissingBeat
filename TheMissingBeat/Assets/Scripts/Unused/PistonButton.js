#pragma strict



public var height : float = 5;
public var speed : float = 20;

private var originalPos : Vector3;
private var wantedPos : Vector3;
private var movingPos : Vector3;
private var down : boolean = true;

private var move : boolean = false;

function Start () {
	originalPos = transform.position;
	wantedPos = originalPos + Vector3(0,height,0);
}

function Update () {
	if(Input.GetButtonDown("Fire1")) {
		move = true;
		movingPos = wantedPos;
		
	}else if(Input.GetButtonUp("Fire1")) {
		move = true;
		movingPos = originalPos;		
	}
	if (move) {
		if ((movingPos - transform.position).magnitude < 0.1) {
			transform.position = movingPos;			
			move = false;
		} else rigidbody.MovePosition(transform.position + (movingPos - transform.position)*speed*Time.deltaTime);
	}
}

function OnDrawGizmos() {
	Gizmos.color = Color.green;
	Gizmos.DrawLine(transform.position + Vector3(transform.localScale.x/2, 0, 0), transform.position + Vector3(transform.localScale.x/2, height, 0));
	Gizmos.DrawLine(transform.position + Vector3(-transform.localScale.x/2, 0, 0), transform.position + Vector3(-transform.localScale.x/2, height, 0));
}