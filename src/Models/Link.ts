import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface LinkAttributes {
  id: number;
  code: string;
  url: string;
  hits: number;
}

interface LinkCreationAttributes extends Optional<LinkAttributes, "id"> {}

class Link
  extends Model<LinkAttributes, LinkCreationAttributes>
  implements LinkAttributes
{
  public id: number;
  public code: string;
  public url: string;
  public hits: number;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
Link.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    url: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    hits: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "links",
    sequelize,
  }
);

export default Link;
