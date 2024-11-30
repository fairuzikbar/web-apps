import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "../assets/css/pages/SplitBill.css";

function SplitBill() {
  const [rows, setRows] = useState([]);
  const [people, setPeople] = useState([]);
  const [newRow, setNewRow] = useState({
    detail: "",
    hargaTotal: "",
    jumlah: "1",
  });
  const [newPerson, setNewPerson] = useState("");
  const [additionalCosts, setAdditionalCosts] = useState({
    "Ongkos Kirim": 0,
    "Biaya Pemesanan": 0,
    "Biaya Parkir": 0,
    "Biaya Kemasan": 0,
  });
  const [pajakPercentage, setPajakPercentage] = useState(0); // Store the percentage of Pajak
  const [diskon, setDiskon] = useState(0);

  const addRow = (e) => {
    e.preventDefault();

    const parsedHargaTotal = parseFloat(newRow.hargaTotal);
    const parsedJumlah = parseInt(newRow.jumlah);

    if (isNaN(parsedHargaTotal) || parsedHargaTotal <= 0) {
      alert("Harga Total harus berupa angka positif.");
      return;
    }

    if (isNaN(parsedJumlah) || parsedJumlah <= 0) {
      alert("Jumlah harus berupa angka positif.");
      return;
    }

    setRows([...rows, { id: rows.length + 1, ...newRow, selectedPeople: [] }]);
    setNewRow({ detail: "", hargaTotal: "", jumlah: "1" });
  };

  // const deleteRow = (rowId) => {
  //   setRows(rows.filter((row) => row.id !== rowId));
  // };

  const deleteRow = (rowId) => {
    const updatedRows = rows.filter((row) => row.id !== rowId);
    // Atur ulang indeks
    const reindexedRows = updatedRows.map((row, index) => ({
      ...row,
      id: index + 1, // Mulai dari 1
    }));
    setRows(reindexedRows);
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (newPerson.trim()) {
      setPeople([...people, newPerson]);
      setNewPerson("");
    }
  };

  const deletePerson = (index) => {
    const updatedPeople = [...people];
    updatedPeople.splice(index, 1); // Hapus orang berdasarkan indeks
    setPeople(updatedPeople);

    // Update selectedPeople di setiap row
    const updatedRows = rows.map((row) => {
      const updatedSelectedPeople = [...row.selectedPeople];
      updatedSelectedPeople.splice(index, 1); // Hapus juga dari selectedPeople
      return { ...row, selectedPeople: updatedSelectedPeople };
    });
    setRows(updatedRows);
  };

  const handleAdditionalCostChange = (field, value) => {
    setAdditionalCosts({ ...additionalCosts, [field]: parseFloat(value) || 0 });
  };

  const handlePajakChange = (e) => {
    setPajakPercentage(parseFloat(e.target.value) || 0); // Set Pajak Percentage
  };

  const handleDiskonChange = (e) => {
    setDiskon(parseFloat(e.target.value) || 0); // Set Pajak Percentage
  };

  const handleCheckboxChange = (rowIndex, personIndex) => {
    const newRows = [...rows];
    const currentRow = newRows[rowIndex];

    if (!currentRow.selectedPeople) {
      currentRow.selectedPeople = Array(people.length).fill(false);
    }

    currentRow.selectedPeople[personIndex] =
      !currentRow.selectedPeople[personIndex];
    setRows(newRows);
  };

  const calculateTotal = () => {
    let totalAll = 0;
    let totalPerPerson = new Array(people.length).fill(0);

    rows.forEach((row) => {
      const hargaTotal = parseFloat(row.hargaTotal) || 0;
      const jumlah = parseInt(row.jumlah) || 1;

      totalAll += hargaTotal;
      row.selectedPeople?.forEach((isSelected, index) => {
        if (isSelected) {
          totalPerPerson[index] += hargaTotal / jumlah;
        }
      });
    });

    // Calculate Pajak as a percentage of the total price
    const pajak = (pajakPercentage / 100) * totalAll;
    // Calculate additional costs (except for Pajak)
    const additionalTotal = Object.values(additionalCosts).reduce(
      (acc, cost) => acc + cost,
      0
    );

    return {
      totalAll: totalAll,
      totalPerPerson,
      pajak,
      additionalTotal,
    }; // Include Pajak in total
  };

  const { totalAll, totalPerPerson, pajak, additionalTotal } = calculateTotal();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div className="App">
      <h1>Split Bill</h1>
      <div className="form-container">
        <form onSubmit={addRow} className="add-row-form">
          <h3>Tambah Pesanan</h3>
          <input
            type="text"
            placeholder="Detail Pengeluaran"
            value={newRow.detail}
            onChange={(e) => setNewRow({ ...newRow, detail: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Harga Total"
            value={newRow.hargaTotal}
            onChange={(e) =>
              setNewRow({ ...newRow, hargaTotal: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Jumlah"
            value={newRow.jumlah}
            onChange={(e) => setNewRow({ ...newRow, jumlah: e.target.value })}
            required
          />
          <button type="submit">Tambah Pesanan</button>
        </form>

        <form onSubmit={addPerson} className="add-person-form">
          <h3>Tambah Orang</h3>
          <input
            type="text"
            placeholder="Nama Orang"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            required
          />
          <button type="submit">Tambah Orang</button>
        </form>

        {/* Form for Additional Costs placed after the other forms */}
        <form className="additional-costs-form">
          <h3>Biaya Tambahan</h3>
          <div>
            <input
              type="text"
              placeholder="Pajak (%)"
              onChange={handlePajakChange}
              min="0"
            />
          </div>
          {Object.keys(additionalCosts).map((key, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={key}
                onChange={(e) =>
                  handleAdditionalCostChange(key, e.target.value)
                }
                min="0"
              />
            </div>
          ))}
          <div>
            <input
              type="text"
              placeholder="Diskon"
              onChange={handleDiskonChange}
              min="0"
            />
          </div>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Detail Pengeluaran</th>
            <th>Harga Total</th>
            <th>Jumlah</th>
            <th>Harga Satuan</th>
            <th>Aksi</th>
            {people.map((person, index) => (
              <th className="capitalize" key={index}>
                {person}
                <FaTrash
                  style={{
                    marginLeft: "5px",
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => deletePerson(index)}
                />
              </th>
            ))}
            {/* {people.map((person, index) => (
              <th key={index}>{person}</th>
            ))} */}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const jumlahPesanan = parseInt(row.jumlah) || 1;
            const selectedCount =
              row.selectedPeople?.filter(Boolean).length || 0;

            return (
              <tr key={row.id}>
                <td data-label="Pesanan No">{row.id}</td>
                <td data-label="Detail Pesanan" className="capitalize">
                  {row.detail}
                </td>
                <td data-label="Harga">{formatCurrency(row.hargaTotal)}</td>
                <td data-label="Jumlah">{row.jumlah}</td>
                <td data-label="Harga Satuan">
                  {formatCurrency(
                    ((parseFloat(row.hargaTotal) || 0) / jumlahPesanan).toFixed(
                      0
                    )
                  )}
                </td>
                <td data-label="Hapus Pesanan">
                  <FaTrash
                    className="delete-icon"
                    onClick={() => deleteRow(row.id)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </td>
                {people.map((person, personIndex) => (
                  <td data-label={person} key={personIndex}>
                    <input
                      type="checkbox"
                      checked={row.selectedPeople?.[personIndex] || false}
                      onChange={() =>
                        handleCheckboxChange(rowIndex, personIndex)
                      }
                      disabled={
                        !row.selectedPeople?.[personIndex] &&
                        selectedCount >= jumlahPesanan
                      }
                    />
                  </td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan="2"></td>
            <td data-label="Harga Total">
              {formatCurrency(totalAll.toFixed(0))}
            </td>
            <td></td>
            <td></td>
            <td></td>
            {totalPerPerson.map((total, index) => (
              <td data-label={people[index]} key={index}>
                {formatCurrency(total.toFixed(0))}
              </td>
            ))}
          </tr>
          <tr>
            <td colSpan="2">Pajak {pajakPercentage}%</td>
            <td data-label={`Pajak ${pajakPercentage}%`}>
              {formatCurrency(pajak.toFixed(0))}
            </td>
            <td></td>
            <td></td>
            <td></td>
            {totalPerPerson.map((total, index) => (
              <td data-label={people[index]} key={index}>
                {formatCurrency(
                  (pajakPercentage
                    ? (total * pajakPercentage) / 100
                    : total
                  ).toFixed(0)
                )}
              </td>
            ))}
          </tr>
          {Object.keys(additionalCosts).map((key, index) => (
            <tr key={index}>
              <td colSpan="2">{key}</td>
              <td data-label={key}>
                {formatCurrency(additionalCosts[key].toFixed(0))}
              </td>
              <td></td>
              <td></td>
              <td></td>
              {people.map((person, personIndex) => (
                <td data-label={person} key={personIndex}>
                  {formatCurrency(
                    (additionalCosts[key] / people.length).toFixed(0)
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan="2">Diskon</td>
            <td data-label="Diskon">{formatCurrency(diskon.toFixed(0))}</td>
            <td></td>
            <td></td>
            <td></td>
            {totalPerPerson.map((total, index) => (
              <td data-label={people[index]} key={index}>
                {formatCurrency(
                  -(
                    totalPerPerson.length > 1
                      ? (diskon / totalAll) * total
                      : diskon
                  ).toFixed(0)
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td colSpan="2">Kurang Bayar</td>
            <td data-label="Kurang Bayar">
              {formatCurrency(
                (totalAll + pajak + additionalTotal - diskon).toFixed(0)
              )}
            </td>
            <td></td>
            <td></td>
            <td></td>
            {totalPerPerson.map((total, index) => (
              <td data-label={people[index]} key={index}>
                {formatCurrency(
                  (totalPerPerson.length > 1 && total
                    ? total +
                      (total * pajakPercentage) / 100 +
                      additionalTotal / totalPerPerson.length -
                      (diskon / totalAll) * total
                    : total
                  ).toFixed(0)
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SplitBill;
