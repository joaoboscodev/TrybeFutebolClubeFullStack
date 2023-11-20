import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from '.';
import Teams from './Teams.model';

class Matches extends Model<InferAttributes<Matches>,
InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Teams.hasMany(Matches, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default Matches;
