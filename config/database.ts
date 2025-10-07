import path from 'path';

export default ({ env }) => {
  const connectionString = env('DATABASE_URL');

  // Se a DATABASE_URL não estiver definida, usa a configuração padrão do SQLite
  if (!connectionString) {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(
            __dirname,
            '..',
            '..',
            env('DATABASE_FILENAME', '.tmp/data.db')
          ),
        },
        useNullAsDefault: true,
      },
    };
  }

  // Se a DATABASE_URL estiver definida, configura a ligação PostgreSQL
  return {
    connection: {
      client: 'postgres',
      connection: {
        connectionString,
        ssl: {
          // A configuração SSL é crucial para o Render
          rejectUnauthorized: false,
        },
      },
      debug: false,
    },
  };
};