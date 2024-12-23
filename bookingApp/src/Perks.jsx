export default function Perks({ perks, setPerks }) {
  function handleCheck(e) {
    // console.log(e.target.checked);
    const { checked, name } = e.target;
    //console.log(e);

    if (checked) {
      setPerks([...perks, name]);
      console.log(perks);
    } else {
      setPerks(perks.filter((perk) => perk !== name));
      console.log(perks);
    }
  }
  return (
    <div className="grid mt-2.5 gap-2.5 grid-cols-2 md:grid-cols-2 lg:grid-cols-6">
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={perks.includes("Parking")}
          name="Parking"
          type="checkbox"
          className="mr-2"
          onChange={(e) => handleCheck(e)}
        />
        <span className="flex items-center">
          Parking Included
          <span className="ml-1">🚗</span>
        </span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={perks.includes("Wi-Fi")}
          name="Wi-Fi"
          type="checkbox"
          className="mr-2"
          onChange={(e) => handleCheck(e)}
        />
        <span className="flex items-center">
          Wi-Fi
          <span className="ml-1">📶</span>
        </span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={perks.includes("Tv")}
          name="Tv"
          type="checkbox"
          className="mr-2"
          onChange={(e) => handleCheck(e)}
        />
        <span className="flex items-center">
          Smart TV with Streaming Services
          <span className="ml-1">📺</span>
        </span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={perks.includes("Pool")}
          name="Pool"
          type="checkbox"
          className="mr-2"
          onChange={(e) => handleCheck(e)}
        />
        <span className="flex items-center">
          Pool and Hot Tub
          <span className="ml-1">💦</span>
        </span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={perks.includes("Pets")}
          name="Pets"
          type="checkbox"
          className="mr-2"
          onChange={(e) => handleCheck(e)}
        />
        <span className="flex items-center">
          Pet-Friendly
          <span className="ml-1">🐶</span>
        </span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          checked={perks.includes("Fireplace")}
          name="Fireplace"
          type="checkbox"
          className="mr-2"
          onChange={(e) => handleCheck(e)}
        />
        <span className="flex items-center">
          Fireplace
          <span className="ml-1">🔥</span>
        </span>
      </label>
    </div>
  );
}
