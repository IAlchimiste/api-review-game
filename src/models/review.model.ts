import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Game } from "./game.model"; // Importez le modèle Game si une relation est nécessaire

export interface ReviewAttributes {
  id: number;
  rating: number;
  review_text: string;
  game_id: number; // Clé étrangère pour le modèle Game
}

// Définir les attributs optionnels pour la création
interface ReviewCreationAttributes extends Optional<ReviewAttributes, "id"> {}

// Définir la classe Review
export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public rating!: number;
  public review_text!: string;
  public game_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialiser le modèle Review
Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    game_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Game,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "reviews",
  }
);

// Définir les relations
Review.belongsTo(Game, { foreignKey: "id", as: "game" });
Game.hasMany(Review, { foreignKey: "game_id", as: "reviews" });