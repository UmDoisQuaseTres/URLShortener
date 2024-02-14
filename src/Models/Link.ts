import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface LinkAttributes {
  id: number;
  code: string;
  url: string;
  hits?: number;
  createdAt?: Date;
  updatedAt?: Date;
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
      validate: {
        isURL: {
          msg: "Invalid URL",
          args: [
            {
              protocols: ["https", "http"],
              require_valid_protocol: true,
              require_protocol: true,
            },
          ],
        },
      },
    },
    hits: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "links",
    sequelize,
  }
);

export default Link;
