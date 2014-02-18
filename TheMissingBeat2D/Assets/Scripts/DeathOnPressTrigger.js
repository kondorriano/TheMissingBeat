#pragma strict

public var otherCollider : Collider2D;

private var deathly : boolean = false;

function Update () {
	var dist : float = (transform.position - otherCollider.transform.position).magnitude - 1.0f;
	
	deathly =  (dist < 0.5f); // Si la distancia es mas pequenya que la medida del jugador
}

function OnTriggerStay2D(col : Collider2D) {
	if (col.tag == "Player") {
		if (deathly) col.gameObject.SendMessage("Die");
	}
}

function OnDrawGizmos() {
	Gizmos.color = Color.red;
	Gizmos.DrawLine(transform.position, otherCollider.transform.position);
}