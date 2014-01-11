#pragma strict

function OnTriggerEnter2D(collision : Collider2D) {
	if (collision.gameObject.tag == "Player"){		
		collision.gameObject.SendMessage("Die");
	}
}

function OnDrawGizmos() {
	Gizmos.color = Color.red;
	Gizmos.DrawWireCube(transform.position, transform.localScale);

}