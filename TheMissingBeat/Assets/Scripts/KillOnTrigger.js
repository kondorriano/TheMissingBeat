#pragma strict

function OnTriggerEnter(collision : Collider) {
	if (collision.gameObject.tag == "Player"){		
		collision.gameObject.SendMessage("Die");
	}
}

function OnDrawGizmos() {
	Gizmos.color = Color.red;
	Gizmos.DrawWireCube(transform.position, transform.localScale);

}