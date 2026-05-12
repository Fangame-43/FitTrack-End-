const sequelize  = require('../config/database');
const Usuario    = require('./Usuario');
const Actividad  = require('./Actividad');
const Meta       = require('./Meta');
const Logro      = require('./Logro');
const UsuarioLogro = require('./UsuarioLogro');

Usuario.hasMany(Actividad,    { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
Actividad.belongsTo(Usuario,  { foreignKey: 'usuario_id' });

Usuario.hasMany(Meta,         { foreignKey: 'usuario_id', onDelete: 'CASCADE' });
Meta.belongsTo(Usuario,       { foreignKey: 'usuario_id' });

Usuario.belongsToMany(Logro,  { through: UsuarioLogro, foreignKey: 'usuario_id' });
Logro.belongsToMany(Usuario,  { through: UsuarioLogro, foreignKey: 'logro_id' });

module.exports = { sequelize, Usuario, Actividad, Meta, Logro, UsuarioLogro };