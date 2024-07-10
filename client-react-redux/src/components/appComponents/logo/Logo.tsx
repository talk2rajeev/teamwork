import teamworkLogo from './teamworkLogo.png';

export const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={teamworkLogo} alt="" style={{ width: 36 }} />
      <span className="text-2xl font-bold text-sky-500 ml-2">Team Work</span>
    </div>
  );
};
