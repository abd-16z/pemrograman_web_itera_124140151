import argparse
import sys
from datetime import date
from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError
from .. import models


def setup_models(dbsession):
    """Menambahkan data awal (seeding) mahasiswa dan matakuliah ke database"""
    # 1. Seeding data awal Mahasiswa
    initial_mahasiswa = [
        models.Mahasiswa(
            nim='124140151',
            nama='Abdul Aziz',
            jurusan='Teknik Informatika',
            tanggal_lahir=date(1800, 12, 12),
            alamat='Jati Agung'
        ),
        models.Mahasiswa(
            nim='124140999',
            nama='Prab',
            jurusan='Teknik Informatika',
            tanggal_lahir=date(1700, 12, 9),
            alamat='Jakarta'
        ),
    ]
    for mhs in initial_mahasiswa:
        if not dbsession.query(models.Mahasiswa).filter_by(nim=mhs.nim).first():
            dbsession.add(mhs)

    # 2. Seeding minimal 3 data awal Matakuliah
    initial_matakuliah = [
        models.Matakuliah(
            kode_mk='IF25-22016',
            nama_mk='Inteligensi Buatan',
            sks=3,
            semester=5
        ),
        models.Matakuliah(
            kode_mk='IF25-22014',
            nama_mk='Pengembangan Aplikasi Web',
            sks=3,
            semester=5
        ),
        models.Matakuliah(
            kode_mk='IF25-21008',
            nama_mk='Jaringan Komputer',
            sks=3,
            semester=3
        ),
    ]
    for mk in initial_matakuliah:
        if not dbsession.query(models.Matakuliah).filter_by(kode_mk=mk.kode_mk).first():
            dbsession.add(mk)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
        print("Berhasil memasukkan data seeding awal mahasiswa dan matakuliah!")
    except OperationalError:
        print("Pyramid gagal terhubung ke database SQL.")
        print("Pastikan service PostgreSQL berjalan dan connection string di development.ini benar.")


if __name__ == '__main__':
    main()
