#pragma strict

//Script cuya funcion es que la camara siga al jugador

private var player : GameObject;
public var radius : float = 5;

public var speed : float = 5;

private var wantedPos : Vector3;
public var displacement : Vector2;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	if (player) {
		wantedPos = player.transform.position + Vector3(displacement.x, displacement.y, 0);
		wantedPos.z = transform.position.z;
	}
	
	var dir : Vector3 = transform.position - wantedPos;
	var magnitude : float = dir.magnitude;
	dir = dir.normalized;
	
	/*if (magnitude > radius)
	{
		transform.position = wantedPos + dir*radius;
	}
	else
	{*/
		var aux = magnitude/radius;
		transform.position += -dir*aux*aux*speed*Time.deltaTime;
	//}
}

function OnDrawGizmos() {
	Gizmos.color = Color.yellow;
	Gizmos.DrawWireSphere(transform.position + Vector3(displacement.x, displacement.y, 0), 1);
	Gizmos.color = Color.red;
	Gizmos.DrawWireSphere(transform.position + Vector3(-displacement.x, -displacement.y, 0), 1);
}