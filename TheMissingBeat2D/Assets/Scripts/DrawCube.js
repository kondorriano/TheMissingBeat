#pragma strict

//Script que dibuja un cubo para facilitar la visualizacion de objetos invisibles

public var gizmoColor : Color = Color.blue;

function OnDrawGizmos() {
	Gizmos.color = gizmoColor;
	Gizmos.DrawWireCube(transform.position, transform.localScale);

}