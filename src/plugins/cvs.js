import { ExportToCsv } from 'export-to-csv-file';

const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'User list',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true
};

const csvExporter = new ExportToCsv(options);

export default {
  run: (data) => {
    if (data.length > 0) {
      csvExporter.generateCsv(data);
    }
  }
}