const axios = require('axios');
const google = require('google-it');
const chalk = require('chalk');

module.exports = {
  name: 'search',
  async xstart(vorterx, m, { args, text, xReact }) {
    if (args[0] === 'search') {
      const Commands = [
        'github',
        'google',
        'weather',
        'script',
        'sc'
      ];

      const envPrefix = process.env.PREFIX;
      const commandS = Commands.map(command => `*${envPrefix}${command}*`).join(', ');

      const helpMsg = `Available commands for search:\n\n${commandS}`;

      await xReact('❌');
      return m.reply(helpMsg);
    }

    switch (args[0]) {
      case 'github': {
        if (!text) {
          await xReact('🌵');
          return m.reply(`*Please provide a git user name e.g github DiegosonTech*`);
        }

        await xReact('📊');
        try {
          const response = await axios.get(`https://api.github.com/users/${text}`);
          const { login, name, bio, followers, public_repos, following, blog, avatar_url } = response.data;

          const rezText8 = `
            *乂 USER GUTHUB INFORMTN 乂*
            _👤 Username:_ *${login}*
            _👤 Name:_ *${name || 'N/A'}*
            _👩‍💻 Bio:_ *${bio || 'N/A'}*
            _🐌 Followers:_ *${followers}*
            _🌷 Public Repos:_ *${public_repos}*
            _👥 Following:_ *${following}*
            _📌 Website:_ ${blog || 'N/A'}
          `;

          const userRepos = await axios.get(`https://api.github.com/users/${text}/repos`);
          const repoNames = userRepos.data.map(repo => repo.name);
          const repoList = repoNames.join('\n');

          vorterx.sendMessage(m.from, { image: { url: avatar_url, mimetype: 'image/jpeg' }, caption: rezText8 + '\n\n*📚 Repositories:*\n' + repoList }, { quoted: m });

          break;

        } catch (error) {
          console.log(error);
        }

        break;
      }
        
case 'sc':
case 'script':
  try {
    const repoUrl = 'https://api.github.com/repos/Vorterx/Aztec-MD';
    const repoResponse = await axios.get(repoUrl);
    const repo = repoResponse.data;

    const gitMsg = `
      🌟 Repository Information 🌟
      ----------------------------
      Name:          ${repo.name}
      Stars:         ${repo.stargazers_count}
      Forks:         ${repo.forks_count}
      License:       ${repo.license.name}
      Last Updated:  ${new Date(repo.updated_at).toLocaleDateString()}
      Repository URL: ${repo.html_url}
    `;

    vorterx.sendMessage(m.from, { image: az_git}, caption: gitMsg ,{ quoted: m}
  } catch (error) {
    console.error(error);
  }
  break;
        
      case 'google': {
        await xReact("🔍");
        google({ query: text }).then(res => {
          let aztec = `🔎 *GOOGLE SEARCH RESULTS* 🔍\n\n${text}\n\n`;

          for (let g of res) {
            aztec += `📚 *TITLE*: ${g.title}\n`;
            aztec += `📝 *DESCRIPTION*: ${g.snippet}\n`;
            aztec += `🌐 *LINK*: ${g.link}\n\n───────────────────────\n\n`;
          }

          const formattedAztec = chalk.bold(aztec);

          const img = "https://i.ibb.co/B3KNxyk/6351f5da506d8f7635f2be3feb6950c6.jpg";
          vorterx.sendMessage(m.from, { image: { url: img }, caption: formattedAztec }, { quoted: m });
        }).catch(err => {
          console.error(err);
        });

        break;
      }

      case 'weather': {
        if (!text) {
          await xReact('❌');
          return m.reply('*Please provide the city of the country e.g weather Johannesburg*');
        }

        try {
          await xReact('🌈');
          const apiKey = 'e409825a497a0c894d2dd975542234b0';
          const weatherData = await getWeatherData(text, apiKey);

          const weatherReport = formatWeatherReport(weatherData);

          const gifUrl = "https://media.tenor.com/bC57J4v11UcAAAPo/weather-sunny.mp4";

          await vorterx.sendMessage(m.from, { body: weatherReport, url: gifUrl, caption: weatherReport, gifPlayback: true }, m);
        } catch (error) {
          console.error(error);
          m.reply("Failed to fetch weather information. Please try again later.");
        }
        break;
      }
    }
  },
};

async function getWeatherData(location, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}&language=tr`;
  const response = await axios.get(url);
  return response.data;
}

function formatWeatherReport(weatherData) {
  const {
    name,
    sys: { country },
    weather,
    main: { temp, temp_min, temp_max, humidity },
    wind: { speed }
  } = weatherData;

  const weatherDescription = weather[0].description;

  const weatherReport = `🌤 *Weather Report* 🌤\n\n🔎 *Search Location:* ${name}\n*💮 Country:* ${country}\n🌈 *Weather:* ${weatherDescription}\n🌡️ *Temperature:* ${temp}°C\n❄️ *Minimum Temperature:* ${temp_min}°C\n📛 *Maximum Temperature:* ${temp_max}°C\n💦 *Humidity:* ${humidity}%\n🎐 *Wind:* ${speed} km/h\n`;

  return weatherReport;
  }
