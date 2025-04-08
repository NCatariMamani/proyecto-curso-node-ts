const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const roleMiddleware = (requiredRoles: any) => {
  return async (req: any, res: any, next: any) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { role: true },
    });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (!requiredRoles.includes(user.role.name)) {
      return res.status(403).json({ message: "Permiso denegado" });
    }

    next();
  };
};