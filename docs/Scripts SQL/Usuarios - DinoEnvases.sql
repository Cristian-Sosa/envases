
USE DinoEnvases2
GO

SELECT * FROM Usuario USO WITH(NOLOCK)



--	CREAR USUARIOS
/*

BEGIN TRAN
	INSERT INTO Usuario(DNI, Nombre, Apellido, Usuario, Password, Habilitado)
	VALUES ('28369410','Eduardo','Huanco', 'ehuanco', 'huanco28',1)

--	COMMIT TRAN

--	ROLLBACK TRAN

*/



--	UPDATEAR USUARIOS

/*

BEGIN TRAN
UPDATE Usuario
	SET DNI = '27549517', Password = '27549517'
WHERE DNI IN ('2251515')

--	COMMIT TRAN

--	ROLLBACK TRAN
*/		