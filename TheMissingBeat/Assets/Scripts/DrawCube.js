#pragma strict

public var gizmoColor : Color = Color.blue;

function OnDrawGizmos() {
	Gizmos.color = gizmoColor;
	Gizmos.DrawWireCube(transform.position, transform.localScale);

}