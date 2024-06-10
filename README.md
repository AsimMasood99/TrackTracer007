# TrackTracer
An interactive music platform with cross-user collaboration and collaborative playlists.

### Project Overview
TrackTracer is a dynamic database application designed to revolutionize the way users interact with music. It allows users to follow artists, like songs, create playlists, and even follow other users. With TrackTracer, users can also view others' followed artists and liked songs, and collaborate on playlists with mutual followers, giving a community-based music experience.
<br />
<br />
### Problem Statement
To build an music app in which one can follow their favourite artists, save the songs they like, make friends and share along their musical experiences via collaborative playlists styles and exploring each others music tastes. 
<br />
<br />
### Tech Stack
#### Frontend:
- HTML5
- CSS3
- JavaScript
#### Backend:
- Node.js with Express framework
#### Database
- MongoDB with Mongoose ODM for Node.js

<br />

### Project Features
1. **Artist Management**
Browse different artists and their discography.
View detailed artist information including country, genre, and albums.
Follow artists to stay updated with their latest releases.

2. **Album and Song Management**
Explore albums and the songs within them.
Search for specific artists or albums.
Like favorite songs for easy access in the liked songs section.

3. **Playlist Creation**
Create custom playlists to organize favorite songs.
Add songs from different artists and albums to playlists.
Personalize music collections based on individual preferences.

4. **Cross-User Interaction**
Follow other users to discover new music based on their preferences.
View followed artists and liked songs of other users.

5. **Collaborative Playlists**
Create and edit collaborative playlists with mutual followers.
Add songs in a shared playlist environment.

6. **Register as an Artist**
If you are an artist, you can register your self on the app. 
Registered artists can create albums and add songs, visible to all users and followers.

<br />
<br />

### Database Design
#### ERD:
Our database includes the following entities:

![Screenshot 2024-06-11 001213](https://github.com/AsimMasood99/TrackTracer007/assets/130085532/8109bb9c-d99a-4718-af14-dfbc03785400)
(OLD ERD)
#### Description:

1. **Album**
Attributes: Album_ID (primary key), Title, Number_of_songs, Release_date, Artist_id (foreign key).
2. **Artist**
Attributes: Artist_ID (primary key), Artist_name, Country, Joining_date.
3. **Song**
Attributes: Song_ID (primary key), Title, Duration, Album_ID (foreign key).
4. **User**
Attributes: User_ID (primary key), Username, Password.
5. **Playlist**
Attributes: Playlist_ID (primary key), Title.
6. **Liked Songs**
Attributes: User_ID (foreign key), Song_ID (foreign key).
7. **Access**
Attributes: User_ID (foreign key), Playlist_ID (foreign key).
8. **Playlist_Songs**
Attributes: Playlist_ID (foreign key), Song_ID (foreign key).
9. **Follower**
Attributes: User_ID (foreign key), Artist_ID (foreign key).
10. **Friend**
Attributes: User_ID (foreign key), Friend_ID (foreign key).

<br />

### Schmema (Latest Database State)

![WhatsApp Image 2024-06-10 at 22 46 13_3b8b693b](https://github.com/AsimMasood99/TrackTracer007/assets/130085532/12212799-caed-4f90-8869-455ba5aed04e)

![WhatsApp Image 2024-06-10 at 22 46 05_220bcf93](https://github.com/AsimMasood99/TrackTracer007/assets/130085532/f56ad1fa-6feb-4291-915a-54a51111d3d2)

![WhatsApp Image 2024-06-10 at 22 45 51_befd0295](https://github.com/AsimMasood99/TrackTracer007/assets/130085532/a37bdd86-3047-4090-b47b-d284edab1bc3)

![WhatsApp Image 2024-06-10 at 22 45 22_1e4d1cda](https://github.com/AsimMasood99/TrackTracer007/assets/130085532/8e2c0779-107b-4b17-afda-220a0e837e0e)

![WhatsApp Image 2024-06-10 at 22 46 30_15da07ea](https://github.com/AsimMasood99/TrackTracer007/assets/130085532/9cdbbbb1-308f-4537-8e19-3e2d23fce612)

<br />

#### Support
Support us by giving an A. 
