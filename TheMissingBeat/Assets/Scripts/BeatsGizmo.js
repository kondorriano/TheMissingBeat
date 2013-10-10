#pragma strict

function OnDrawGizmos() {
	Gizmos.color = Color.white;
	for(var i : int = 0; i < 360; ++i) {
		Gizmos.DrawRay(Vector3(i,0,0), Vector3.up*100);
		Gizmos.DrawRay(Vector3(i,0,0), Vector3.up*-100);
	}
	
}