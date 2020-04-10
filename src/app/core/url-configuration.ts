interface UrlConfigurationContent {
    endPointUrl: string;
    method: string;
    token: boolean;
}

export interface match {
    category: string;
    clubMatch: boolean;
    competition: string;
    externalId: number;
    id: number;
    matchTime: string;
    matchTimeinSec : any;
    matchType: string;
    status: string;
    team1: string;
    team1Id: number;
    team1pic: any;
    team2: string;
    team2Id: number;
    team2pic: any;
    venue: string;
    totalLeagues: number;
    totalMoney: number;
}

export interface Team {
  captain: player;
  id: number;
  players: player[];
  points: 0;
  rank: number;
  teamNumber: number;
  userName: string;
  viceCaptain: player;
}

export interface contest {
  category: string;
  createdOn: string;
  currentParticipants: number;
  entryFee: number;
  id: string;
  matchId: number;
  participants: number;
  startTime: string;
  status: string;
  totalPrize: number;
  type: string;
  winners: number;
}

export interface player {
  age: number;
  club: string;
  displayName: string;
  externalId: number;
  height: number;
  id: number;
  name: string;
  nationality: string;
  playerRole: string;
  playerStatus: string;
  price: number;
  point: number;
  selected : boolean;
}

export interface UrlConfiguration {
    login: UrlConfigurationContent;
}
