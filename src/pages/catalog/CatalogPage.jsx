import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "../../routes/appRoutes";
import { getMinMaxPrice } from "../../utilities/utils";
import Pagination from "../../components/shared/Pagination";
import CatalogItem from "./CatalogItem";
import catalog_list from "../../utilities/catalog_list.json";
import "./catalog.css";

const ITEMS_PER_PAGE = 10;
const DEBOUNCE_DELAY = 300;

export default function CatalogPage() {
    const { t } = useTranslation();
    const { minPrecio = 0, maxPrecio = 0 } = getMinMaxPrice(catalog_list);
    const location = useLocation();

    const [priceFilter, setPriceFilter] = useState(minPrecio);
    const [debouncedPrice, setDebouncedPrice] = useState(minPrecio);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [yearFilter, setYearFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const initialSearchTerm = location.state?.searchTerm || "";
    const [searchInput, setSearchInput] = useState(initialSearchTerm);
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const navigate = useNavigate();

    useEffect(() => {
        if (initialSearchTerm) {
            setSearchTerm(initialSearchTerm);
            setSearchInput(initialSearchTerm);
        }
    }, [initialSearchTerm]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedPrice(priceFilter);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [priceFilter]);

    /* Normalizar estructura */
    const allItems = useMemo(() => {
        return catalog_list.pages.flatMap(page => page.items);
    }, []);

    /* Obtener años únicos */
    const availableYears = useMemo(() => {
        const years = allItems
            .map(item => {
                const year = item.fecha_lanzamiento?.split("-")[0];
                return year ? parseInt(year, 10) : null;
            })
            .filter(year => year !== null);
        return [...new Set(years)].sort((a, b) => b - a);
    }, [allItems]);

    /* Filtro combinado */
    const filteredItems = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return allItems.filter(item => {
            const matchPrice = item.precio_usd >= debouncedPrice;
            const matchRating = ratingFilter === 0 || (item.calificacion >= ratingFilter);
            const matchYear = !yearFilter || item.fecha_lanzamiento?.startsWith(yearFilter);

            if (!term) return matchPrice && matchRating && matchYear;

            const text = `
        ${item.titulo}
        ${item.autor}
        ${item.descripcion}
      `.toLowerCase();

            return matchPrice && matchRating && matchYear && text.includes(term);
        });
    }, [allItems, debouncedPrice, searchTerm, ratingFilter, yearFilter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedPrice, searchTerm, ratingFilter, yearFilter]);

    /* Paginado */
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);


    const handlePriceFilterChange = (e) => {
        setPriceFilter(Number(e.target.value));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput);
    };

    const handleReset = () => {
        setPriceFilter(minPrecio);
        setRatingFilter(0);
        setYearFilter("");
        setSearchInput("");
        setSearchTerm("");
    };

    const handleRatingFilterChange = (e) => {
        setRatingFilter(Number(e.target.value));
    };

    const handleYearFilterChange = (e) => {
        setYearFilter(e.target.value);
    };

    const handleViewDetail = (book) => {
        navigate(AppRoutes.bookDetail.replace(":id", book.titulo), { replace: true, state: { book} });
    }

    return (
        <div className="catalog-container">
            <div className="row h-100">

                <div className="col col-md-3 border-end filter-form">
                    <h5>{t('catalog.filters')}</h5>

                    <form className="mb-3">
                        <label className="form-label">
                            {t('catalog.priceRange')} ${priceFilter}
                        </label>

                        <input
                            type="range"
                            className="form-range"
                            min={minPrecio}
                            max={maxPrecio}
                            step="1"
                            value={priceFilter}
                            onChange={handlePriceFilterChange}
                        />

                        <div className="d-flex justify-content-between">
                            <span>{minPrecio}</span>
                            <span>{maxPrecio}</span>
                        </div>
                    </form>

                    <form className="mb-3">
                        <label htmlFor="ratingFilter" className="form-label">
                            {t('catalog.ratingByStars')}
                        </label>
                        <select 
                            name="ratingFilter" 
                            id="ratingFilter" 
                            className="form-select"
                            value={ratingFilter}
                            onChange={handleRatingFilterChange}
                        >
                            <option value="0">{t('catalog.allRatings')}</option>
                            <option value="5">{t('catalog.fiveStars')}</option>
                            <option value="4">{t('catalog.fourStarsOrMore')}</option>
                            <option value="3">{t('catalog.threeStarsOrMore')}</option>
                            <option value="2">{t('catalog.twoStarsOrMore')}</option>
                            <option value="1">{t('catalog.oneStarOrMore')}</option>
                        </select>
                    </form>

                    <form className="mb-3">
                        <label htmlFor="yearFilter" className="form-label">
                            {t('catalog.publicationYear')}
                        </label>
                        <select 
                            name="yearFilter" 
                            id="yearFilter" 
                            className="form-select"
                            value={yearFilter}
                            onChange={handleYearFilterChange}
                        >
                            <option value="">{t('catalog.allYears')}</option>
                            {availableYears.map(year => (
                                <option key={year} value={year.toString()}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>


                <div className="col col-md-9">

                    <form
                        className="mb-3 d-flex gap-2"
                        onSubmit={handleSearchSubmit}
                    >
                        <input
                            type="search"
                            className="form-control"
                            placeholder={t('catalog.searchPlaceholder')}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button className="btn btn-dark" type="submit">
                            {t('catalog.search')}
                        </button>
                        <button className="btn btn-primary" type="button" onClick={handleReset}>{t('catalog.reset')}</button>
                    </form>


                    <div className="catalog-list">
                        {paginatedItems.length === 0 && (
                            <p className="text-muted">
                                {t('catalog.noResults')}
                            </p>
                        )}

                        {paginatedItems.map(item => (
                            <CatalogItem
                                key={`${item.titulo}-${item.autor}`}
                                onViewDetail={handleViewDetail}
                                data={item}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-4 d-flex justify-content-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
